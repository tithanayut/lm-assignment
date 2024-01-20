import { Suspense } from "react";
import { Navigate, useMatch, useNavigate, useParams } from "react-router-dom";

import { MenuBody } from "./components/MenuBody";
import { MenuBodyFallback } from "./components/MenuBodyFallback";
import { MenuDrawer } from "./components/MenuDrawer";
import { MenuHeader } from "./components/MenuHeader";
import { MenuHeaderFallback } from "./components/MenuHeaderFallback";

export function RestaurantMenu() {
  const navigate = useNavigate();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const match = useMatch("/restaurant/:restaurantId/:menuId");

  if (!restaurantId) {
    return <Navigate to="/" />;
  }
  return (
    <div className="w-screen min-h-screen">
      <Suspense fallback={<MenuHeaderFallback />}>
        <MenuHeader restaurantId={restaurantId} />
      </Suspense>
      <Suspense fallback={<MenuBodyFallback />}>
        <MenuBody restaurantId={restaurantId} />
      </Suspense>

      <MenuDrawer
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
