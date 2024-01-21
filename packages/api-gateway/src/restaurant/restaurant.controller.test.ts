import { describe, expect, it, vi } from "vitest";

import { RestaurantController } from "./restaurant.controller";
import type { MenuItemDTO, MenuListDTO, RestaurantDTO, RestaurantListDTO } from "./restaurant.dto";
import { RestaurantRepository } from "./restaurant.repository";
import { RestaurantService } from "./restaurant.service";

describe("restaurant.controller.ts", () => {
  describe("getRestaurantList", () => {
    it("should call restaurant service and return the result", async () => {
      const restaurantService = new RestaurantService(new RestaurantRepository());
      const getRestaurantListSpy = vi
        .spyOn(restaurantService, "getRestaurantList")
        .mockResolvedValue("mock" as unknown as RestaurantListDTO);
      const restaurantController = new RestaurantController(restaurantService);

      const data = await restaurantController.getRestaurantList();

      expect(getRestaurantListSpy).toHaveBeenCalled();
      expect(data).toBe("mock");
    });
  });

  describe("getRestaurantInfo", () => {
    it("should call restaurant service and return the result", async () => {
      const restaurantService = new RestaurantService(new RestaurantRepository());
      const getRestaurantInfoSpy = vi
        .spyOn(restaurantService, "getRestaurantInfo")
        .mockResolvedValue("mock" as unknown as RestaurantDTO);
      const restaurantController = new RestaurantController(restaurantService);

      const data = await restaurantController.getRestaurantInfo(1);

      expect(getRestaurantInfoSpy).toHaveBeenCalledWith(1);
      expect(data).toBe("mock");
    });
  });

  describe("getMenuList", () => {
    it("should call restaurant service and return the result", async () => {
      const restaurantService = new RestaurantService(new RestaurantRepository());
      const getMenuListSpy = vi
        .spyOn(restaurantService, "getMenuList")
        .mockResolvedValue("mock" as unknown as MenuListDTO);
      const restaurantController = new RestaurantController(restaurantService);

      const data = await restaurantController.getMenuList(1, { limit: 10, page: 1 });

      expect(getMenuListSpy).toHaveBeenCalledWith(1, 10, 1);
      expect(data).toBe("mock");
    });
  });

  describe("getMenuItem", () => {
    it("should call restaurant service and return the result", async () => {
      const restaurantService = new RestaurantService(new RestaurantRepository());
      const getMenuItemSpy = vi
        .spyOn(restaurantService, "getMenuItem")
        .mockResolvedValue("mock" as unknown as MenuItemDTO);
      const restaurantController = new RestaurantController(restaurantService);

      const data = await restaurantController.getMenuItem(1, "ข้าวมันไก่");

      expect(getMenuItemSpy).toHaveBeenCalledWith(1, "ข้าวมันไก่");
      expect(data).toBe("mock");
    });
  });
});
