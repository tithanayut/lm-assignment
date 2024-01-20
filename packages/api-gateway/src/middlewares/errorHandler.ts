import { isAxiosError } from "axios";
import { type NextFunction, type Response } from "express";
import { type ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { Service } from "typedi";

@Middleware({ type: "after" })
@Service()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: Error, req: Request, res: Response, next: NextFunction) {
    if (isAxiosError(error)) {
      return res.status(503).json({ message: "Service Unavailable" });
    }
    if (error instanceof HttpError) {
      return res.status(error.httpCode as number).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
