import { Response } from "express";

function sendResponse(
  res: Response,
  {
    status,
    message,
    data = null,
    success,
  }: { status: number; message: string; data: object | null; success: boolean }
) {
  res.status(status).json({
    data,
    message,
    success,
    status,
  });
}

export default sendResponse;
