import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number; // tempo que foi criado
  exp: number; // quando vai expirar
  sub: string; // id do user
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);
      // sub vem do payload que foi colocado lá no sign lá do SessionUserService
      const { sub } = decodedToken as ITokenPayload;

      request.user = {
        id: sub,
      };

      return next();
    } catch {
      throw new AppError("Invalid JWT token", 401);
    }
  }
}
