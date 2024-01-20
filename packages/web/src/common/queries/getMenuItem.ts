import { apiClient } from "@/common/client/axios";
import type { MenuItemDTO } from "@/common/dto/restaurant";

export async function getMenuItem(restaurantId: string, menuId: string): Promise<MenuItemDTO> {
  const res = await apiClient.get(`/restaurants/${restaurantId}/menus/${menuId}`, {
    validateStatus: (status) => status === 200,
  });
  return res.data;
}
