import { apiClient } from "@/common/client/axios";
import type { RestaurantDTO } from "@/common/dto/restaurant";

export async function getRestaurantInfo(restaurantId: string): Promise<RestaurantDTO> {
  const res = await apiClient.get(`/restaurants/${restaurantId}`, {
    validateStatus: (status) => status === 200,
  });
  return res.data;
}
