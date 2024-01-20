import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";

import { restaurantApiClient } from "../common/axios";
import type { FullMenuDataSourceDTO, RestaurantDataSourceDTO, ShortMenuDataSourceDTO } from "./restaurant.dto";

@Service()
export class RestaurantRepository {
  async getRestaurantInfo(restaurantId: number): Promise<RestaurantDataSourceDTO> {
    const res = await restaurantApiClient.get<RestaurantDataSourceDTO>(
      `/restaurants/${encodeURIComponent(restaurantId)}.json`,
      {
        validateStatus: (status) => status === 200 || status === 404,
      },
    );

    if (res.status === 404) {
      throw new NotFoundError("Restaurant not found");
    }

    return res.data;
  }

  async getShortMenu(restaurantId: number, menuId: string): Promise<ShortMenuDataSourceDTO> {
    const res = await restaurantApiClient.get<ShortMenuDataSourceDTO>(
      `/restaurants/${encodeURIComponent(restaurantId)}/menus/${encodeURIComponent(menuId)}/short.json`,
      {
        validateStatus: (status) => status === 200 || status === 400 || status === 404,
      },
    );

    if (res.status === 400 || res.status === 404) {
      throw new NotFoundError("Restaurant not found");
    }

    return res.data;
  }

  async getFullMenu(restaurantId: number, menuId: string): Promise<FullMenuDataSourceDTO> {
    const res = await restaurantApiClient.get<FullMenuDataSourceDTO>(
      `/restaurants/${encodeURIComponent(restaurantId)}/menus/${encodeURIComponent(menuId)}/full.json`,
      {
        validateStatus: (status) => status === 200 || status === 400 || status === 404,
      },
    );

    if (res.status === 400 || res.status === 404) {
      throw new NotFoundError("Item not found");
    }

    return res.data;
  }
}
