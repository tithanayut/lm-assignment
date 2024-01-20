import { Suspense } from "react";
import { Navigate, useMatch, useNavigate, useParams } from "react-router-dom";

import { MenuItemDrawer } from "./components/MenuItemDrawer";
import { MenuListBody } from "./components/MenuListBody";
import { MenuListBodyFallback } from "./components/MenuListBodyFallback";
import { MenuListHeader } from "./components/MenuListHeader";
import { MenuListHeaderFallback } from "./components/MenuListHeaderFallback";

export function RestaurantMenuList() {
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const match = useMatch("/restaurant/:restaurantId/:menuId");

  if (!restaurantId) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-screen min-h-screen">
      <Suspense fallback={<MenuListHeaderFallback />}>
        <MenuListHeader restaurantId={restaurantId} />
      </Suspense>
      <Suspense fallback={<MenuListBodyFallback />}>
        <MenuListBody restaurantId={restaurantId} />
      </Suspense>

      <MenuItemDrawer
        isOpen={!!match}
        setOpen={(open) => {
          if (!open) navigate(`/restaurant/${restaurantId}`, { replace: true });
        }}
        restaurantId={restaurantId}
        menuId={match?.params.menuId ?? ""}
      />
    </div>
  );
}
