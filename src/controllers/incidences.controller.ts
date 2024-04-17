import { Server } from 'socket.io';
import * as incidencesService from '../service/incidences.service';
import { Request, Response } from 'express';
import { Incidence } from '../types/Incidence';

let io: Server;

// Initialize socket.io
function setIo(serverIo: Server) {
  io = serverIo;
}

async function getAllIncidences(req: Request, res: Response) {
  const allIncidences = await incidencesService.getAllIncidences();
  res.json(allIncidences);
}

async function createIncidence(req: Request, res: Response) {
  const input: Incidence = req.body;
  const newIncidence = await incidencesService.createIncidence(input);
  res.json(newIncidence);

  // Emit new incidence to all clients
  io.emit('incidenceCreated', newIncidence);
}

async function updateStatus(req: Request, res: Response) {
  const { id, status } = req.body;
  const updatedIncidence = await incidencesService.updateStatus(id, status);
  res.json(updatedIncidence);
}

export {
  setIo,
  getAllIncidences,
  createIncidence,
  updateStatus,
}
