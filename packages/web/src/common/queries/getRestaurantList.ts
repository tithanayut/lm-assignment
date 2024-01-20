import { apiClient } from "@/common/client/axios";
import type { RestaurantListDTO } from "@/common/dto/restaurant";

export async function getRestaurantList(): Promise<RestaurantListDTO> {
  const res = await apiClient.get("/restaurants", {
    validateStatus: (status) => status === 200,
  });
  return res.data;
}
