import { NextFunction, Response, Request } from "express";

export interface MiddlewareFunction {
  (req: Request, res: Response, next: NextFunction): void;
}
