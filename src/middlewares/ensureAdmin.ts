import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import {prisma} from "../lib/prisma"

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (!request.userId) {
      return next(new AppError('User ID not found in request', 401));
    }
  
    const user = await prisma.user.findUnique({
      where: { id: request.userId }
    });
  
    if (!user) {
      return next(new AppError('User not found', 404));
    }
  
    if (!user.isAdmin) {
      return next(new AppError('User is not an admin', 403));
    }
  
    next();
  }