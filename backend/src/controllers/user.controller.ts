import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma_client";
import sendResponse from "../utils/sendResponse";
import bcrypt from "bcrypt";
import { NotFoundError, UnauthorizedError } from "../utils/customError";
import jwt from "jsonwebtoken";

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    console.log(data);
    data.email = String(data.email).toLowerCase();

    data.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data,
    });

    return sendResponse(res, {
      status: 201,
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    data.email = String(data.email).toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const token = await jwt.sign({ id: user.id }, "secretkey", {
      expiresIn: "1d",
    });

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "User logged in successfully",
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
}

export async function userProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return sendResponse(res, {
      status: 200,
      success: true,
      message: "User profile",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
