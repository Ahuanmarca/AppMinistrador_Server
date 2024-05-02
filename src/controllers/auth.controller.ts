import { Request, Response } from 'express';
import * as authService from '../service/auth.service';
import { AuthCredentials } from '../types/AuthCredentials';

async function login(req: Request, res: Response) {
  const { username, password } : AuthCredentials = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({ msg: 'Error' });
  }

  try {
    const data = await authService.login({ username, password });
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      const myError = JSON.parse(error.message);
      res.status(myError.code);
      res.json({ msg: myError.msg });
    } else {
      res.status(500);
      res.json({ msg: 'An unexpected error occurred' });
    }
  }
}

export {
  login,
}