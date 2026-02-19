import { NextFunction, Response, Request } from "express";
import status from "http-status";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: `Route ${req.originalUrl} Not Found.`,
  });
};
