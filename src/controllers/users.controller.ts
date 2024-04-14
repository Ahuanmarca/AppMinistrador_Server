import { Request, Response } from 'express';
import * as usersService from '../service/users.service';

async function getAll(req: Request, res: Response) {
  const allUsers = await usersService.getAll();
  res.json(allUsers);
}

async function getById(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await usersService.getById(userId);
  res.json(user);
}

async function getByUsername(req: Request, res: Response) {
  const { username } = req.query;
  const user = await usersService.getByUsername(username);
  res.json(user);
}

export {
  getAll,
  getById,
  getByUsername,
}
