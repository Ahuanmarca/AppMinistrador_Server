import * as providersRepository from '../repository/providers.repository';
import {Request, Response} from 'express';

async function getAllProviders(req: Request, res: Response) {
  const allProviders = await providersRepository.getAllProviders();
  res.json(allProviders);
}

export {
  getAllProviders,
}
