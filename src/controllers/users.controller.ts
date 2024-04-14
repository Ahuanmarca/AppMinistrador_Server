import { Request, Response } from 'express';
import * as usersService from '../service/users.sercice';

async function getAll(req: Request, res: Response) {
  const allUsers = await usersService.getAll();
  res.json(allUsers);
}

async function getById(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await usersService.getById(userId);
  res.json(user);
}





export {
  getById,
  getAll,
}