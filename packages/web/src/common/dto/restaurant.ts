export type RestaurantListDTO = Array<{
  restaurantId: number;
  name: string;
}>;

export interface RestaurantDTO {
  restaurantId: number;
  name: string;
  coverImage: string;
  isOpen: boolean;
  activeTimePeriod: {
    open: string;
    close: string;
  };
}

export interface MenuListDTO {
  data: Array<{
    menuId: string;
    name: string;
    image?: string;
    fullPrice: number;
    discountedPrice: number;
    isInStock: boolean;
  }>;
  meta: {
    currentPage: number;
    totalPage: number;
  };
}

export interface MenuItemDTO {
  menuId: string;
  name: string;
  image?: string;
  fullPrice: number;
  discountedPrice: number;
  isInStock: boolean;
  options: Array<{
    label: string;
    choices: Array<{ label: string }>;
  }>;
}
