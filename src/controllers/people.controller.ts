import * as peopleRepository from '../repository/people.repository';
import { Request, Response } from 'express';

async function getAllPeople(req: Request, res: Response) {
  const allPeople = await peopleRepository.getAllPeople();
  res.json(allPeople);
}

export {
  getAllPeople,
}
