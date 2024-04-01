import * as buildingsRepository from '../repository/buildings.repository';
import { Request, Response } from 'express';

async function getAllBuildings(req: Request, res: Response) {
  const allBuildings = await buildingsRepository.getAllBuildings();
  res.json(allBuildings);
}

async function getBuildingsList(req: Request, res: Response) {
  const buildingsList = await buildingsRepository.getBuildingsList();
  res.json(buildingsList);
}

async function getBuildingById(req: Request, res: Response) {
  const { buildingId } = req.params;
  const building = await buildingsRepository.getBuildingById(Number(buildingId));
  res.json(building);
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}
