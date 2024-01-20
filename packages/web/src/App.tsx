import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorScreen } from "./common/screens/ErrorScreen";
import { NotFoundScreen } from "./common/screens/NotFoundScreen";
import { RestaurantMenu } from "./pages/RestaurantMenu/RestaurantMenu";
import { RestaurantSelection } from "./pages/RestaurantSelection/RestaurantSelection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RestaurantSelection />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/restaurant/:restaurantId/*",
    element: <RestaurantMenu />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary fallback={<ErrorScreen />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
