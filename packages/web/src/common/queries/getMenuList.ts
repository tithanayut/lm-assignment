import { apiClient } from "@/common/client/axios";
import type { MenuListDTO } from "@/common/dto/restaurant";

export async function getMenuList(restaurantId: string): Promise<MenuListDTO> {
  const res = await apiClient.get(`/restaurants/${restaurantId}/menus`, {
    validateStatus: (status) => status === 200,
  });
  return res.data;
}
