import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../service/users.service';

function requireLogin(req: Request, res: Response, next: NextFunction ) {
  
  const token = req.headers.authorization;
  
  if (!token) {
    // res.status(401).send({ msg: 'Unauthorized' }); // Is this the same as the next line?
    res.status(401);
    return res.json({ msg: 'Unauthorized' });
  }

  const { TOKEN_SECRET_WORD } = process.env;

  // provess.env variables are of type string | undefined for TS
  if (!TOKEN_SECRET_WORD) {
    res.status(500);
    return res.json({ msg: 'Internal Server Error' });
  }

  jwt.verify(
    token,
    TOKEN_SECRET_WORD,
    async (err, payload) => {
      if (err) {
        res.status(401);
        return res.json({ msg: 'Unauthorized' });
      }

      // @ts-expect-error - TS says userId doesn't exist in payload
      const user = await userService.getById(payload.userId);

      // TODO: Check if user is validated

      // @ts-expect-error - TS says user doesn't exist in req
      req.user = user;
      next();      
    }
  );
}

export default requireLogin;
