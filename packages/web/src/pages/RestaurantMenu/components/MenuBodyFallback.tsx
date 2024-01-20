import { PageContainer } from "@/common/components/container";

import { MenuItemFallback } from "./components/MenuItemFallback";

export function MenuBodyFallback() {
  return (
    <PageContainer className="p-1">
      <div className="flex flex-col my-4">
        <MenuItemFallback />
        <MenuItemFallback />
        <MenuItemFallback />
        <MenuItemFallback />
        <MenuItemFallback />
        <MenuItemFallback />
      </div>
    </PageContainer>
  );
}
