import * as peopleRepository from '../repository/people.repository';
import { Request, Response } from 'express';
import { format } from 'date-fns';

async function getAllPeople(req: Request, res: Response) {
  const allPeople = await peopleRepository.getAllPeople();
  res.json(allPeople);
}

async function countNeighboursByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;

  const currentDate = format(new Date(), 'yyyy-MM-dd');
  let dates: Array<string>;

  if (typeof req.query.dates === 'string') {
    dates = [req.query.dates, currentDate];
  } else if (
    Array.isArray(req.query.dates) &&
    req.query.dates.every((e) => typeof e === 'string')
  ) {
    dates = req.query.dates as string[];
    dates.push(currentDate);
  } else {
    dates = [format(new Date(), 'yyyy-MM-dd')];
  }

  const buildingNeighbours =
    await peopleRepository.countNeighboursByBuildingId(Number(buildingId), dates);
  res.json(buildingNeighbours);
}

async function countOwnersByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;
  
  const buildingOwners = await peopleRepository.countOwnersByBuildingId(Number(buildingId));
  res.json(buildingOwners);
}

async function getNeighboursByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;

  const buildingNeighbours = await peopleRepository.getNeighboursByBuildingId(Number(buildingId));
  res.json(buildingNeighbours);
}

export {
  getAllPeople,
  countNeighboursByBuildingId,
  countOwnersByBuildingId,
  getNeighboursByBuildingId,
};
