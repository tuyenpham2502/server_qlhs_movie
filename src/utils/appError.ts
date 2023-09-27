export default class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor(public errors: string, public statusCode: number = 500) {
    super(errors);
    this.status = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

