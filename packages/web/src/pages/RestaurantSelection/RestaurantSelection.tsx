import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/common/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/select";
import { getRestaurantList } from "@/common/queries/getRestaurantList";
import { ErrorScreen } from "@/common/screens/ErrorScreen";

export function RestaurantSelection() {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState<string>("");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => await getRestaurantList(),
  });

  const handleChooseRestaurant = () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  if (isError) return <ErrorScreen />;
  return (
    <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center w-screen h-screen">
      <h1 className="text-2xl lg:text-3xl text-center font-bold text-green-600">เลือกร้านอาหาร</h1>

      <Select value={restaurantId} onValueChange={setRestaurantId}>
        <SelectTrigger className="w-[330px]">
          <SelectValue placeholder={isLoading ? "กำลังโหลด..." : "เลือกร้าน"} />
        </SelectTrigger>
        <SelectContent>
          {data?.map((restaurant) => (
            <SelectItem key={restaurant.restaurantId} value={String(restaurant.restaurantId)}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleChooseRestaurant} disabled={restaurantId === ""}>
        ยืนยัน
      </Button>
    </div>
  );
}
