import * as incidencesService from '../service/incidences.service';
import { Request, Response } from 'express';
import { Incidence } from '../types/Incidence';

async function getAllIncidences(req: Request, res: Response) {
  const allIncidences = await incidencesService.getAllIncidences();
  res.json(allIncidences);
}

async function createIncidence(req: Request, res: Response) {
  const input: Incidence = req.body;
  const newIncidence = await incidencesService.createIncidence(input);
  res.json(newIncidence);
}

export {
  getAllIncidences,
  createIncidence,
}