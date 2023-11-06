import { NextFunction, Request, Response } from 'express';
import { findAllUsers, updateMe } from '../services/user.service';
import AppError from '../utils/appError';
import { queryHelper } from '../helpers';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      getMyProfile: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    let query = queryHelper(req.query);

    const users = await findAllUsers({}, query);
    res.status(200).json({
      status: 'success',
      result: users.length,
      getAllUser: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


export const updateMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;

    const updatedUser = await updateMe(user._id, {
      name: req.body.name,
      avatar: req.body.avatar,
    });

    res.status(200).json({
      status: 'success',
      updateMyProfile: {
        updatedUser,
      },
    });
  
    

  } catch (err: any) {
    next(err);
  }
}


