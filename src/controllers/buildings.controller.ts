import * as buildingsService from '../service/buildings.service';
import { Request, Response } from 'express';

async function getAllBuildings(req: Request, res: Response) {
  const allBuildings = await buildingsService.getAllBuildings();
  res.json(allBuildings);
}

async function getBuildingsList(req: Request, res: Response) {
  const buildingsList = await buildingsService.getBuildingsList();
  res.json(buildingsList);
}

async function getBuildingById(req: Request, res: Response) {
  const { buildingId } = req.params;

  if (isNaN(Number(buildingId))) {
    return res.json({ Error: 'buildingId must be a number' });
  }

  const building = await buildingsService.getBuildingById(Number(buildingId));
  res.json(building);
}

export { getAllBuildings, getBuildingsList, getBuildingById };
