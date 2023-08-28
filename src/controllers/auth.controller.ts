import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, signToken } from '../services/user.service';
import AppError from '../utils/appError';

// Exclude this fields from the response
export const excludedFields = ['password'];

// Cookie options

const cookieOptions: CookieOptions = {
  httpOnly : true,
  sameSite: 'lax',
  secure: true,
};

const accessTokenCookieOptions: CookieOptions = {
  ... cookieOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ... cookieOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 24 * 60 * 60 * 1000,
};



// Only set secure to true in production
if (process.env.NODE_ENV === 'production')
  cookieOptions.secure = true;



export const registerHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Email already exist',
      });
    }
    next(err);
  }
};

export const loginHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: req.body.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new AppError('Invalid email or password', 401));
    }

    // Create an Access Token, refresh token and send it to the client
    const { accessToken, refreshToken } = await signToken(user);

    
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);

    // Send Refresh Token in Cookie
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      status: 'success',
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    next(err);
  }
};

