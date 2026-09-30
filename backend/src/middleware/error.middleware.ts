import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('[Error Middleware]:', err);

  if (err instanceof ZodError) {
    const firstIssue = err.issues[0];
    res.status(400).json({
      status: 'failed',
      message: firstIssue ? firstIssue.message : 'Validation error',
    });
    return;
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'failed',
    message,
  });
}
