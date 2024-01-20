import { useSuspenseQuery } from "@tanstack/react-query";

import { getMenuItem } from "@/common/queries/getMenuItem";

interface MenuItemDrawerContentProps {
  restaurantId: string;
  menuId: string;
}

export function MenuItemDrawerContent(props: MenuItemDrawerContentProps) {
  const { restaurantId, menuId } = props;
  const { data } = useSuspenseQuery({
    queryKey: ["restaurants", restaurantId, "menus", menuId],
    queryFn: async () => await getMenuItem(restaurantId, menuId),
  });

  return (
    <div className="relative flex flex-col gap-4 overflow-y-auto rounded-xl">
      <div className="flex justify-center pt-6 pb-4 sticky top-0 bg-white">
        <h2 className="text-3xl lg:text-4xl text-center w-[calc(100%-120px)]">{data.name}</h2>
      </div>
      {data.image ? (
        <img src={data.image} className="w-full h-[330px] object-cover -z-10" />
      ) : (
        <div className="flex justify-center items-center w-full h-[330px] text-lg bg-gray-300">ไม่มีภาพประกอบ</div>
      )}
      <div className="flex flex-col items-center gap-2 px-6 pb-6 w-full">
        <p className="text-2xl lg:text-3xl border-b pb-3 border-gray-300 w-full">ราคา {data.discountedPrice} บาท</p>
        {data.options.map((option) => (
          <div key={option.label} className="flex flex-col gap-2 w-full">
            <h3 className="text-xl lg:text-2xl">{option.label}</h3>
            {option.choices.map((choice) => (
              <h4 key={choice.label} className="text-lg lg:text-xl">
                - {choice.label}
              </h4>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
