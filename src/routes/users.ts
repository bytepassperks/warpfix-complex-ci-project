import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { UserModel } from '../models/user';

export const userRouter = Router();

userRouter.get('/me', authenticate, async (req: any, res: any) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Intentional: missing return type
userRouter.get('/stats', authenticate, async (req: any, res: any) => {
  var stats = {
    totalUsers: 0,
    activeUsers: 0,
    newToday: 0
  };
  
  try {
    stats = await UserModel.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});
