import * as incidencesRepository from '../repository/incidences.repository';

async function getAllIncidences() {
  return await incidencesRepository.getAllIncidences();
}

async function createIncidence(incidence) {
  const newIncidence = await incidencesRepository.createIncidence(incidence);
  return newIncidence;
}

async function updateStatus(id, status) {
  const updatedIncidence = await incidencesRepository.updateStatus(id, status);
  return updatedIncidence;
}

export {
  getAllIncidences,
  createIncidence,
  updateStatus,
}
