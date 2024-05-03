import * as incidencesService from '../service/incidences.service';
import { Request, Response } from 'express';
import { IncidenceInput } from '../types/IncidenceInput';
import { getIo } from '../config/socket';

async function getAllIncidences(req: Request, res: Response) {
  const allIncidences = await incidencesService.getAllIncidences();
  res.json(allIncidences);
}

async function createIncidence(req: Request, res: Response) {
  const input: IncidenceInput = req.body;
  const newIncidence = await incidencesService.createIncidence(input);
  res.json(newIncidence);

  // Emit new incidence to all clients
  getIo().emit('incidenceCreated', newIncidence);
  console.log('Incidence created');
}

async function updateStatus(req: Request, res: Response) {
  const { id, status }: { id: number, status: string } = req.body;
  console.log(typeof id, typeof status);
  const updatedIncidence = await incidencesService.updateStatus(id, status);
  res.json(updatedIncidence);
}

export {
  getAllIncidences,
  createIncidence,
  updateStatus,
}
