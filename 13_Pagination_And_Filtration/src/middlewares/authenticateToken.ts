import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return; // Ensure it terminates the middleware
  }

  jwt.verify(token, 'super_secret_key', (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden
      return; // Ensure it terminates the middleware
    }
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};
