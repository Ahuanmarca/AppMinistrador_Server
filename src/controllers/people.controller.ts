import * as peopleRepository from '../repository/people.repository';
import { Request, Response } from 'express';

async function getAllPeople(req: Request, res: Response) {
  const allPeople = await peopleRepository.getAllPeople();
  res.json(allPeople);
}

async function getNeighboursByBuildingId(req: Request, res: Response) {
  const { buildingId } = req.params;
  const buildingNeighbours: number = await peopleRepository.getNeighboursByBuildingId(
    Number(buildingId)
  );
  res.json(buildingNeighbours);
}

export { getAllPeople, getNeighboursByBuildingId };
