import * as buildingsRepository from '../repository/buildings.repository';
import { Request, Response } from 'express';
import { formatBuilding, formatBuildingList } from '../utils/formatters';

async function getAllBuildings(req: Request, res: Response) {
  const allBuildings = await buildingsRepository.getAllBuildings();
  const formattedBuildings = allBuildings.map((b) => formatBuilding(b));
  res.json(formattedBuildings);
}

async function getBuildingsList(req: Request, res: Response) {
  const buildingsList = await buildingsRepository.getBuildingsList();
  res.json(formatBuildingList(buildingsList));
}

async function getBuildingById(req: Request, res: Response) {
  const { buildingId } = req.params;
  const building = await buildingsRepository.getBuildingById(Number(buildingId));
  res.json(formatBuilding(building));
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}
