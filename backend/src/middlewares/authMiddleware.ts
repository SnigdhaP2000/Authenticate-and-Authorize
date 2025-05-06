import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/jwt';
import redis from '../services/redisService';
import AuthRequest from '../interfaces/authInterface';

let redisService = new redis();

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).send('Missing token'); // Send response, but don't return
    return; // This return is just to stop further processing in this middleware
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token); // assuming this returns decoded token info

    // Check if token is stored in Redis
    const stored = await redisService.get(`${token}`);
    if (stored) {
      // Store the user info in the request object
      req.user = stored;
      req.token = token;

      // Refresh token expiration
      await redisService.set(`${token}`, stored, 86400);
      next(); // Proceed to the next middleware/controller
    } else {
      res.status(401).send('Token invalid or expired');
    }
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
