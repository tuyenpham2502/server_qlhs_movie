import express from 'express';
import {
  getMeHandler,
  getUsersHandler,
  updateMeHandler,
} from '../controllers/user.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get('/', restrictTo('admin'), getUsersHandler);

// Get my info route
router.get('/me', getMeHandler);

// Update my info route
router.put('/updateMe', updateMeHandler);





export default router;

