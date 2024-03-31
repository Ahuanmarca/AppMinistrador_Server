import * as buildingsRepository from '../repository/buildings.repository';
import { Request, Response } from 'express';

async function getAllBuildings(req: Request, res: Response) {
  const allBuildings = await buildingsRepository.getAllBuildings();
  res.json(allBuildings);
}

export {
  getAllBuildings,
}
