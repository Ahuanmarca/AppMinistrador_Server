import * as incidencesService from '../service/incidences.service';
import { Request, Response } from 'express';

async function getAllIncidences(req: Request, res: Response) {
  const allIncidences = await incidencesService.getAllIncidences();
  res.json(allIncidences);
}

const testIncidence = {
  title: 'Hay cucarachas en el baño',
  description: 'En el baño de la planta baja hay cucarachas',
  image_url: 'https://picsum.photos/200/300',
  user_dni: '92347502X',
  building_id: 1,
  date: new Date(),
  time: new Date(),
  status: 'pendiente',
  category: 'Limpieza',
}

async function createIncidence(req: Request, res: Response) {
  const newIncidence = await incidencesService.createIncidence(testIncidence);
  res.json(newIncidence);
}


export {
  getAllIncidences,
  createIncidence,
}