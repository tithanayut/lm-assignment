import { describe, expect, it, vi } from "vitest";

import {
  MOCK_FULL_MENU,
  MOCK_RESTAURANT_INFO,
  MOCK_RESTAURANTS,
  MOCK_SHORT_MENU_1,
  MOCK_SHORT_MENU_2,
} from "../data/restaurants.mock";
import { RestaurantRepository } from "./restaurant.repository";
import { RestaurantService } from "./restaurant.service";

describe("restaurant.service.ts", () => {
  describe("getRestaurantList", () => {
    it("should return restaurant list from constant data", async () => {
      vi.mock("../data/restaurants", () => ({ RESTAURANTS: MOCK_RESTAURANTS }));

      const restaurantService = new RestaurantService(new RestaurantRepository());
      const data = await restaurantService.getRestaurantList();

      expect(data).toStrictEqual([
        { restaurantId: 1, name: "A" },
        { restaurantId: 2, name: "B" },
      ]);
    });
  });

  describe("getRestaurantInfo", () => {
    it("should return restaurant info", async () => {
      const restaurantRepository = new RestaurantRepository();
      const getRestaurantInfoSpy = vi
        .spyOn(restaurantRepository, "getRestaurantInfo")
        .mockResolvedValue(MOCK_RESTAURANT_INFO);

      const isCurrentTimeInPeriod = await import("../utils/isCurrentTimeInPeriod");
      vi.spyOn(isCurrentTimeInPeriod, "isCurrentTimeInPeriod").mockReturnValue(false);

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getRestaurantInfo(1);

      expect(getRestaurantInfoSpy).toHaveBeenCalledWith(1);
      expect(data).toStrictEqual({
        restaurantId: 1,
        name: "A",
        coverImage: "https://image",
        isOpen: false,
        activeTimePeriod: { open: "11:00", close: "13:00" },
      });
    });

    it("should call isCurrentTimeInPeriod to determine isOpen", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getRestaurantInfo").mockResolvedValue(MOCK_RESTAURANT_INFO);

      const isCurrentTimeInPeriod = await import("../utils/isCurrentTimeInPeriod");
      const isCurrentTimeInPeriodSpy = vi.spyOn(isCurrentTimeInPeriod, "isCurrentTimeInPeriod").mockReturnValue(true);

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getRestaurantInfo(1);

      expect(isCurrentTimeInPeriodSpy).toHaveBeenCalledWith({ begin: "11:00", end: "13:00" });
      expect(data.isOpen).toBe(true);
    });
  });

  describe("getMenuList", () => {
    it("should return menu list", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getRestaurantInfo").mockResolvedValue(MOCK_RESTAURANT_INFO);
      vi.spyOn(restaurantRepository, "getShortMenu").mockResolvedValueOnce(MOCK_SHORT_MENU_1);

      const restaurantService = new RestaurantService(restaurantRepository);
      const LIMIT = 1;
      const PAGE = 1;
      const data = await restaurantService.getMenuList(1, LIMIT, PAGE);

      expect(data).toStrictEqual({
        data: [
          {
            menuId: "ข้าวมันไก่",
            name: "ข้าวมันไก่",
            image: "https://thumb-image",
            fullPrice: 100,
            discountedPrice: 100,
            isInStock: true,
          },
        ],
        meta: {
          currentPage: 1,
          totalPage: 2,
        },
      });
    });

    it("should paginate to the second page correctly", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getRestaurantInfo").mockResolvedValue(MOCK_RESTAURANT_INFO);
      vi.spyOn(restaurantRepository, "getShortMenu").mockImplementation(async (_, menuId: string) => {
        if (menuId === "ข้าวมันไก่") {
          return MOCK_SHORT_MENU_1;
        }
        return MOCK_SHORT_MENU_2;
      });

      const restaurantService = new RestaurantService(restaurantRepository);
      const LIMIT = 1;
      const PAGE = 2;
      const data = await restaurantService.getMenuList(1, LIMIT, PAGE);

      expect(data).toStrictEqual({
        data: [
          {
            menuId: "ข้าวหน้าเป็ด",
            name: "ข้าวหน้าเป็ด",
            image: "https://thumb-image",
            fullPrice: 100,
            discountedPrice: 100,
            isInStock: true,
          },
        ],
        meta: {
          currentPage: 2,
          totalPage: 2,
        },
      });
    });
  });

  describe("getMenuItem", () => {
    it("should return menu item", async () => {
      const restaurantRepository = new RestaurantRepository();
      const getMenuItemSpy = vi.spyOn(restaurantRepository, "getFullMenu").mockResolvedValue(MOCK_FULL_MENU);

      const calculateDiscountedPrice = await import("../utils/calculateDiscountedPrice");
      vi.spyOn(calculateDiscountedPrice, "calculateDiscountedPrice").mockReturnValue(90);

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getMenuItem(1, "ข้าวหน้าปลา");

      expect(getMenuItemSpy).toHaveBeenCalledWith(1, "ข้าวหน้าปลา");
      expect(data).toStrictEqual({
        menuId: "ข้าวหน้าปลา",
        name: "ข้าวหน้าปลา",
        image: "https://large-image",
        fullPrice: 100,
        discountedPrice: 90,
        isInStock: true,
        options: [{ label: "A", choices: [{ label: "A1" }, { label: "A2" }] }],
      });
    });

    it("should call calculateDiscountedPrice to determine discountedPrice", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getFullMenu").mockResolvedValue(MOCK_FULL_MENU);

      const calculateDiscountedPrice = await import("../utils/calculateDiscountedPrice");
      const calculateDiscountedPriceSpy = vi
        .spyOn(calculateDiscountedPrice, "calculateDiscountedPrice")
        .mockReturnValue(90);

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getMenuItem(1, "ข้าวหน้าปลา");

      expect(calculateDiscountedPriceSpy).toHaveBeenCalledWith({
        fullPrice: 100,
        discountedPercent: 10,
        timePeriod: { begin: "11:00", end: "13:00" },
      });
      expect(data.discountedPrice).toBe(90);
    });

    it("should determine isInStock to true when totalInStock is positive", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getFullMenu").mockResolvedValue({
        ...MOCK_FULL_MENU,
        totalInStock: 10,
      });

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getMenuItem(1, "ข้าวหน้าปลา");

      expect(data.isInStock).toBe(true);
    });

    it("should determine isInStock to false when totalInStock is zero", async () => {
      const restaurantRepository = new RestaurantRepository();
      vi.spyOn(restaurantRepository, "getFullMenu").mockResolvedValue({
        ...MOCK_FULL_MENU,
        totalInStock: 0,
      });

      const restaurantService = new RestaurantService(restaurantRepository);
      const data = await restaurantService.getMenuItem(1, "ข้าวหน้าปลา");

      expect(data.isInStock).toBe(false);
    });
  });
});
