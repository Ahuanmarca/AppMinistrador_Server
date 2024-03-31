import { Request, Response, NextFunction } from 'express';

function catchAsync(
  asyncFunc: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFunc(req, res, next).catch(next);
  };
}

export default catchAsync;
