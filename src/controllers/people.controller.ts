import * as peopleService from '../service/people.service';
import { Request, Response } from 'express';

async function getAllPeople(req: Request, res: Response) {
  const allPeople = await peopleService.getAllPeople();
  res.json(allPeople);
}

async function countNeighboursByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;

  // Thsi isNaN check causes TS error on people.routes!!
  if (isNaN(Number(buildingId))) {
    return res.json({ Error: 'buildingId must be a number' });
  }

  // Check if there are query params
  // If not, must pass empty array to service
  let dates: Array<string>;
  if (typeof req.query.dates === 'string') {
    dates = [req.query.dates];
  } else if (
    Array.isArray(req.query.dates) &&
    req.query.dates.every((e) => typeof e === 'string')
  ) {
    dates = req.query.dates as string[];
  } else {
    dates = [];
  }

  const buildingNeighbours = await peopleService.countNeighboursByBuildingId(Number(buildingId), dates);
  res.json(buildingNeighbours);
}

async function countOwnersByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;
  
  const buildingOwners = await peopleService.countOwnersByBuildingId(Number(buildingId));
  res.json(buildingOwners);
}

async function getNeighboursByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;

  const buildingNeighbours = await peopleService.getNeighboursByBuildingId(Number(buildingId));
  res.json(buildingNeighbours);
}

async function getUsersByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;

  const buildingUsers = await peopleService.getUsersByBuildingId(Number(buildingId));
  res.json(buildingUsers);
}

export {
  getAllPeople,
  countNeighboursByBuildingId,
  countOwnersByBuildingId,
  getNeighboursByBuildingId,
  getUsersByBuildingId,
};
