import express from 'express';
import { loginHandler, logoutHandler, registerHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schema/user.schema';
import { deserializeUser } from '../middleware/deserializeUser';

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler);

// Logout user route
router.use(deserializeUser);
router.post('/logout', logoutHandler);


export default router;
