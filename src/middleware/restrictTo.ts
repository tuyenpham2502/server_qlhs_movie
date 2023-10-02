import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  const checkedRole = allowedRoles.some((role) => user.role.includes(role));
  if (!checkedRole) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  };
  next();
};
