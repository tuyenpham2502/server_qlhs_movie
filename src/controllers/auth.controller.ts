import config from "config";
import { CookieOptions, NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import { createUser, findUser, signToken } from "../services/user.service";
import AppError from "../utils/appError";
import redisClient from "../utils/connectRedis";
import crypto from "crypto";
import { sendVerificationEmail } from "../middleware/verifyEmmail";

// Exclude this fields from the response
export const excludedFields = ["password"];

// Cookie options

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() +
      config.get<number>("refreshTokenExpiresIn") * 24 * 60 * 60 * 1000
  ),
  maxAge: config.get<number>("refreshTokenExpiresIn") * 24 * 60 * 60 * 1000,
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production") cookieOptions.secure = true;


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
      emailToken: crypto.randomBytes(64).toString("hex"),
    });

    // Send verification email
    sendVerificationEmail(user, res);

    
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(202).json({
        status: "fail",
        message: "Email already exist",
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
      return next(new AppError("Invalid email or password", 202));
    }

    if(!user.isVerified) {
      return next(new AppError("Please verify your email", 202));
    }

    // Create an Access Token, refresh token and send it to the client
    const { token, refreshToken } = await signToken(user);

    res.cookie("accessToken", token, accessTokenCookieOptions);

    // Send Refresh Token in Cookie
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      success: true,
      signInWithEmail: {
        token,
        refreshToken,
      },
    });
  } catch (err: any) {
    next(err);
  }
};



export const verifyEmailHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) {
      throw new AppError('Please provide a email token', 404);
    }

    const user = await findUser({ emailToken });

    if(user) {
    user.emailToken = null;
    user.isVerified = true;

    await user?.save({ validateBeforeSave: false });

    const token = await signToken(user!);

    res.status(200).json({
      status: 'success',
      verifyEmail: {
        token,
      },
    });
    }
    else res.status(404).json({
      status: 'fail',
      message: 'Email verification failed, invalid token',
    });

  }
  catch (err: any) {
    next(err);
  }
}


export const logoutHandler = async (
  req : Request,
  res : Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;;

    // Delete user session
    await redisClient.del(user?._id.toString());

    res.cookie("logged_in", "", { maxAge: -1 });
    res.cookie("accessToken", "", { maxAge: -1 });
    res.cookie("refreshToken", "", { maxAge: -1 });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err: any) {
    console.log(err);
  }
};
