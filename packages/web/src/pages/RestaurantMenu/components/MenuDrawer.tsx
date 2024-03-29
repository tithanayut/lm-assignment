import { ChevronDown } from "lucide-react";
import { Suspense } from "react";

import { Drawer, DrawerContent } from "@/common/components/drawer";

import { MenuDrawerContent } from "./components/MenuDrawerContent";
import { MenuDrawerContentFallback } from "./components/MenuDrawerContentFallback";

interface MenuDrawerProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  restaurantId: string;
  menuId: string;
}

export function MenuDrawer(props: MenuDrawerProps) {
  const { isOpen, setOpen, restaurantId, menuId } = props;

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setOpen(open);
      }}
    >
      <DrawerContent className="h-[calc(100vh*0.9)] lg:h-[calc(100vh*0.8)] lg:w-[calc(100vw*0.75)] border-0 mx-auto">
        <button
          className="absolute z-10 top-6 right-5"
          title="ปิด"
          onClick={() => {
            setOpen(false);
          }}
        >
          <ChevronDown className="h-8 lg:h-10 w-8 lg:w-10 opacity-50" />
        </button>
        <Suspense fallback={<MenuDrawerContentFallback />}>
          {menuId && <MenuDrawerContent restaurantId={restaurantId} menuId={menuId} />}
        </Suspense>
      </DrawerContent>
    </Drawer>
  );
}
