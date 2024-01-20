import { type Application } from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";

import { PORT } from "./common/env";
import { ErrorHandler } from "./middlewares/errorHandler";
import { RestaurantController } from "./restaurant/restaurant.controller";

useContainer(Container);

const app: Application = createExpressServer({
  cors: true,
  defaultErrorHandler: false,
  controllers: [RestaurantController],
  middlewares: [ErrorHandler],
});

app.get("/", (_, res) => res.send("LINE MAN Wongnai Frontend Assignment"));

try {
  app.listen(PORT, (): void => {
    console.log(`Listening successfully on port ${PORT}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
