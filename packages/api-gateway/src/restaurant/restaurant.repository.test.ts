import { NotFoundError } from "routing-controllers";
import { describe, expect, it, vi } from "vitest";

import { restaurantApiClient } from "../common/axios";
import { RestaurantRepository } from "./restaurant.repository";

describe("restaurant.repository.ts", () => {
  describe("getRestaurantInfo", () => {
    it("should call restaurant api the correct endpoint and return data", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 200, data: "mock" });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();
      const data = await restaurantRepository.getRestaurantInfo(1);

      expect(mockFn).toHaveBeenCalledWith(encodeURI("/restaurants/1.json"), expect.anything());
      expect(data).toBe("mock");
    });

    it("should throw NotFoundError if api returned 404", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 404 });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();

      await expect(restaurantRepository.getRestaurantInfo(1)).rejects.toThrowError(NotFoundError);
    });
  });

  describe("getShortMenu", () => {
    it("should call restaurant api the correct endpoint and return data", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 200, data: "mock" });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();
      const data = await restaurantRepository.getShortMenu(1, "ข้าวมันไก่");

      expect(mockFn).toHaveBeenCalledWith(encodeURI("/restaurants/1/menus/ข้าวมันไก่/short.json"), expect.anything());
      expect(data).toBe("mock");
    });

    it("should throw NotFoundError if api returned 400", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 400 });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();

      await expect(restaurantRepository.getShortMenu(1, "ข้าวมันไก่")).rejects.toThrowError(NotFoundError);
    });

    it("should throw NotFoundError if api returned 404", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 404 });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();

      await expect(restaurantRepository.getShortMenu(1, "ข้าวมันไก่")).rejects.toThrowError(NotFoundError);
    });
  });

  describe("getFullMenu", () => {
    it("should call restaurant api the correct endpoint and return data", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 200, data: "mock" });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();
      const data = await restaurantRepository.getFullMenu(1, "ข้าวมันไก่");

      expect(mockFn).toHaveBeenCalledWith(encodeURI("/restaurants/1/menus/ข้าวมันไก่/full.json"), expect.anything());
      expect(data).toBe("mock");
    });

    it("should throw NotFoundError if api returned 400", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 400 });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();

      await expect(restaurantRepository.getFullMenu(1, "ข้าวมันไก่")).rejects.toThrowError(NotFoundError);
    });

    it("should throw NotFoundError if api returned 404", async () => {
      const mockFn = vi.fn().mockResolvedValue({ status: 404 });
      vi.spyOn(restaurantApiClient, "get").mockImplementation(mockFn);

      const restaurantRepository = new RestaurantRepository();

      await expect(restaurantRepository.getFullMenu(1, "ข้าวมันไก่")).rejects.toThrowError(NotFoundError);
    });
  });
});
