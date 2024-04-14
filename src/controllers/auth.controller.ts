import {Request, Response} from 'express';
import * as authService from '../service/auth.service';
// import { isValidEmail } from '../utils/helpers';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    return res.json({ msg: 'Error' });
  }

  try {
    const token = await authService.login({ username, password });
    res.json({ token });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.code);
    res.json({ msg: myError.msg });
  }
}

export {
  login,
}