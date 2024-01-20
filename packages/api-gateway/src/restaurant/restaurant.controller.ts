import "reflect-metadata";

import { Get, JsonController, Param, QueryParams } from "routing-controllers";
import { Service } from "typedi";

import { PaginationQuery } from "../common/validator";
import { RestaurantService } from "./restaurant.service";

@JsonController("/restaurants")
@Service()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get("/")
  async getRestaurantList() {
    const restaurants = await this.restaurantService.getRestaurantList();
    return restaurants;
  }

  @Get("/:restaurantId")
  async getRestaurantInfo(@Param("restaurantId") restaurantId: number) {
    const restaurant = await this.restaurantService.getRestaurantInfo(restaurantId);
    return restaurant;
  }

  @Get("/:restaurantId/menus")
  async getMenuList(@Param("restaurantId") restaurantId: number, @QueryParams() { limit, page }: PaginationQuery) {
    const menuList = await this.restaurantService.getMenuList(restaurantId, limit, page);
    return menuList;
  }

  @Get("/:restaurantId/menus/:menuId")
  async getMenuItem(@Param("restaurantId") restaurantId: number, @Param("menuId") menuId: string) {
    const menuItem = await this.restaurantService.getMenuItem(restaurantId, menuId);
    return menuItem;
  }
}
