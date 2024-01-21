import { Service } from "typedi";

import { RESTAURANTS } from "../data/restaurants";
import { calculateDiscountedPrice } from "../utils/calculateDiscountedPrice";
import { isCurrentTimeInPeriod } from "../utils/isCurrentTimeInPeriod";
import type { MenuItemDTO, MenuListDTO, RestaurantDTO, RestaurantListDTO } from "./restaurant.dto";
import { RestaurantRepository } from "./restaurant.repository";

@Service()
export class RestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async getRestaurantList(): Promise<RestaurantListDTO> {
    return RESTAURANTS.map((restaurant) => ({
      restaurantId: restaurant.restaurantId,
      name: restaurant.name,
    }));
  }

  async getRestaurantInfo(restaurantId: number): Promise<RestaurantDTO> {
    const restaurant = await this.restaurantRepository.getRestaurantInfo(restaurantId);

    const { id, name, coverImage, activeTimePeriod } = restaurant;
    return {
      restaurantId: id,
      name,
      coverImage,
      isOpen: isCurrentTimeInPeriod({ begin: activeTimePeriod.open, end: activeTimePeriod.close }),
      activeTimePeriod,
    };
  }

  async getMenuList(restaurantId: number, limit: number, page: number): Promise<MenuListDTO> {
    const restaurant = await this.restaurantRepository.getRestaurantInfo(restaurantId);

    const menuIds = restaurant.menus.slice((page - 1) * limit, page * limit);

    const menuRequests = menuIds.map(async (menuId) => {
      const shortMenu = await this.restaurantRepository.getShortMenu(restaurantId, menuId);

      const { id, name, thumbnailImage, fullPrice, discountedPercent, discountedTimePeriod, totalInStock } = shortMenu;
      return {
        menuId: id,
        name,
        image: thumbnailImage,
        fullPrice,
        discountedPrice: calculateDiscountedPrice({ fullPrice, discountedPercent, timePeriod: discountedTimePeriod }),
        isInStock: totalInStock > 0,
      };
    });
    const menuList = await Promise.all(menuRequests);

    return {
      data: menuList,
      meta: {
        currentPage: page,
        totalPage: Math.ceil(restaurant.menus.length / limit),
      },
    };
  }

  async getMenuItem(restaurantId: number, menuId: string): Promise<MenuItemDTO> {
    const fullMenu = await this.restaurantRepository.getFullMenu(restaurantId, menuId);

    const { id, name, largeImage, fullPrice, discountedPercent, discountedTimePeriod, totalInStock, options } =
      fullMenu;

    return {
      menuId: id,
      name,
      image: largeImage,
      fullPrice,
      discountedPrice: calculateDiscountedPrice({ fullPrice, discountedPercent, timePeriod: discountedTimePeriod }),
      isInStock: totalInStock > 0,
      options,
    };
  }
}
