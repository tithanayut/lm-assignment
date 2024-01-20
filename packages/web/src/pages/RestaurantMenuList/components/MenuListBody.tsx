import { useSuspenseQuery } from "@tanstack/react-query";

import { PageContainer } from "@/common/components/container";
import { getMenuList } from "@/common/queries/getMenuList";

import { MenuItem } from "./components/MenuItem";

interface MenuListBodyProps {
  restaurantId: string;
}

export function MenuListBody(props: MenuListBodyProps) {
  const { restaurantId } = props;
  const { data } = useSuspenseQuery({
    queryKey: ["restaurants", restaurantId, "menus"],
    queryFn: async () => await getMenuList(restaurantId),
  });

  return (
    <PageContainer className="lg:px-1">
      <div className="flex flex-col my-4">
        {data.data.map((menu, i) => (
          <MenuItem
            // menuId from gateway is not unique, falling back to index for uniqueness
            key={`${i}${menu.menuId}`}
            id={menu.menuId}
            name={menu.name}
            image={menu.image}
            fullPrice={menu.fullPrice}
            discountedPrice={menu.discountedPrice}
            isInStock={menu.isInStock}
          />
        ))}
      </div>
    </PageContainer>
  );
}
