import * as incidencesRepository from '../repository/incidences.repository';
import { IncidenceInput } from '../types/IncidenceInput';

async function getAllIncidences() {
  return await incidencesRepository.getAllIncidences();
}

async function createIncidence(incidence: IncidenceInput) {
  const newIncidence = await incidencesRepository.createIncidence(incidence);
  return newIncidence;
}

async function updateStatus(id: number | string, status: string) {
  const updatedIncidence = await incidencesRepository.updateStatus(id, status);
  return updatedIncidence;
}

export {
  getAllIncidences,
  createIncidence,
  updateStatus,
}
