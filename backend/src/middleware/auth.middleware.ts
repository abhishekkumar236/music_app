import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/customError";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
      };
    }
  }
}

async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    const decoded = (await jwt.verify(token, "secretkey")) as { id: number };

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    next(error);
  }
}

export default auth;
