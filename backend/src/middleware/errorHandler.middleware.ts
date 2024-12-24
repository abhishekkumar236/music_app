import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  sendResponse(res, {
    status: status,
    success: false,
    message: message,
    data: null,
  });

  next();
}

export default errorHandler;
