import { useSuspenseQuery } from "@tanstack/react-query";

import { PageContainer } from "@/common/components/container";
import { getRestaurantInfo } from "@/common/queries/getRestaurantInfo";

interface MenuHeaderProps {
  restaurantId: string;
}

export function MenuHeader(props: MenuHeaderProps) {
  const { restaurantId } = props;
  const { data } = useSuspenseQuery({
    queryKey: ["restaurants", restaurantId],
    queryFn: async () => await getRestaurantInfo(restaurantId),
  });

  return (
    <div className="w-full h-full">
      <img src={data.coverImage} className="w-full h-[calc(100vh*0.25)] lg:h-[calc(100vh*0.3)] object-cover" />
      <PageContainer className="flex flex-col gap-2">
        <div className="flex items-start lg:items-end gap-3 mt-4 lg:mt-8">
          <h1 className="text-4xl lg:text-5xl">{data.name}</h1>
          {data.isOpen ? (
            <div className="text-xl py-1 px-8 rounded-lg bg-[#0cbc25] text-white mb-1">เปิด</div>
          ) : (
            <div className="text-xl py-1 px-8 rounded-lg bg-red-600 text-white mb-1">ปิด</div>
          )}
        </div>
        <p className="text-xl">
          เวลาเปิด - ปิด: {data.activeTimePeriod.open} - {data.activeTimePeriod.close}
        </p>
      </PageContainer>
    </div>
  );
}
