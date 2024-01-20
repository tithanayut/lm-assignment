import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { PageContainer } from "@/common/components/container";
import { getMenuList } from "@/common/queries/getMenuList";

import { MenuItem } from "./components/MenuItem";
import { MenuItemFallback } from "./components/MenuItemFallback";

interface MenuBodyProps {
  restaurantId: string;
}

export function MenuBody(props: MenuBodyProps) {
  const { restaurantId } = props;
  const { ref, inView } = useInView();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["restaurants", restaurantId, "menus"],
    queryFn: async (query) => await getMenuList(restaurantId, query.pageParam.page),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.currentPage === lastPage.meta.totalPage) return undefined;
      return { page: lastPage.meta.currentPage + 1 };
    },
    initialPageParam: { page: 1 },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageContainer className="lg:px-1 my-4">
      <div className="flex flex-col">
        {data.pages
          .flatMap((page) => page.data)
          .map((menu, i) => (
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
      {hasNextPage && (
        <div ref={ref}>
          <MenuItemFallback />
          <MenuItemFallback />
          <MenuItemFallback />
        </div>
      )}
    </PageContainer>
  );
}
