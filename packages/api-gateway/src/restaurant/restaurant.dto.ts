export type RestaurantListDTO = Array<{
  restaurantId: number;
  name: string;
}>;

export interface RestaurantDTO {
  restaurantId: number;
  name: string;
  coverImage: string;
  isOpen: boolean;
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

export interface RestaurantDataSourceDTO {
  name: string;
  id: number;
  coverImage: string;
  menus: string[];
  activeTimePeriod: {
    open: string;
    close: string;
  };
}

export interface ShortMenuDataSourceDTO {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
}

export interface FullMenuDataSourceDTO {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
  largeImage?: string;
  options: Array<{
    label: string;
    choices: Array<{ label: string }>;
  }>;
}
