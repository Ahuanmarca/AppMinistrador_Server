import * as buildingsService from '../service/buildings.service';
import { Request, Response } from 'express';
import { formatBuilding, formatBuildingList } from '../utils/formatters';

async function getAllBuildings(req: Request, res: Response) {
  const allBuildings = await buildingsService.getAllBuildings();
  const formattedBuildings = allBuildings.map((b) => formatBuilding(b));
  res.json(formattedBuildings);
}

async function getBuildingsList(req: Request, res: Response) {
  const buildingsList = await buildingsService.getBuildingsList();
  res.json(formatBuildingList(buildingsList));
}

async function getBuildingById(req: Request, res: Response) {
  const { buildingId } = req.params;

  if (isNaN(Number(buildingId))) {
    return res.json({ Error: 'buildingId must be a number' });
  }

  const building = await buildingsService.getBuildingById(Number(buildingId));
  res.json(formatBuilding(building));
}

export { getAllBuildings, getBuildingsList, getBuildingById };
