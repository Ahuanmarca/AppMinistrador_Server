import * as providersService from '../service/providers.service';
import {Request, Response} from 'express';

async function getAllProviders(req: Request, res: Response) {
  const allProviders = await providersService.getAllProviders();
  res.json(allProviders);
}

export {
  getAllProviders,
}
