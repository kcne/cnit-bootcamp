import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
};