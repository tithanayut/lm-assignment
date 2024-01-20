import axios from "axios";

import { RESTAURANT_API_BASE_URL } from "./env";

export const restaurantApiClient = axios.create({
  baseURL: RESTAURANT_API_BASE_URL,
  timeout: 10000,
});
