import type {
  FullMenuDataSourceDTO,
  RestaurantDataSourceDTO,
  RestaurantListDTO,
  ShortMenuDataSourceDTO,
} from "../restaurant/restaurant.dto";

export const MOCK_RESTAURANTS: RestaurantListDTO = [
  { restaurantId: 1, name: "A" },
  { restaurantId: 2, name: "B" },
];

export const MOCK_RESTAURANT_INFO: RestaurantDataSourceDTO = {
  id: 1,
  name: "A",
  menus: ["ข้าวมันไก่", "ข้าวหน้าเป็ด"],
  activeTimePeriod: { open: "11:00", close: "13:00" },
  coverImage: "https://image",
};

export const MOCK_SHORT_MENU_1: ShortMenuDataSourceDTO = {
  id: "ข้าวมันไก่",
  name: "ข้าวมันไก่",
  thumbnailImage: "https://thumb-image",
  fullPrice: 100,
  discountedPercent: 0,
  totalInStock: 10,
  sold: 10,
};

export const MOCK_SHORT_MENU_2: ShortMenuDataSourceDTO = {
  id: "ข้าวหน้าเป็ด",
  name: "ข้าวหน้าเป็ด",
  thumbnailImage: "https://thumb-image",
  fullPrice: 100,
  discountedPercent: 0,
  totalInStock: 10,
  sold: 10,
};

export const MOCK_FULL_MENU: FullMenuDataSourceDTO = {
  id: "ข้าวหน้าปลา",
  name: "ข้าวหน้าปลา",
  thumbnailImage: "https://image",
  largeImage: "https://large-image",
  fullPrice: 100,
  discountedPercent: 10,
  discountedTimePeriod: { begin: "11:00", end: "13:00" },
  totalInStock: 10,
  sold: 10,
  options: [{ label: "A", choices: [{ label: "A1" }, { label: "A2" }] }],
};
