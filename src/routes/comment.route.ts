import express from 'express';
import { createCommentHandler, getNewCommentHandler } from './../controllers/comment.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { restrictTo } from '../middleware/restrictTo';
const router = express.Router();
router.use(deserializeUser, requireUser);

// Create comment
router.post('/createComment', restrictTo('admin','user'), createCommentHandler);

//get new comment last week
router.get('/getNewCommentLastWeek', restrictTo('admin'), getNewCommentHandler);

export default router;