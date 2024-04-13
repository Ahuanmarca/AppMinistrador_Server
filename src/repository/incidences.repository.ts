import prisma from '../config/prisma';

async function getAllIncidences() {
  return await prisma.incidences.findMany();
}

async function createIncidence(incidence) {
  console.log(incidence);
  return incidence;
}

export {
  getAllIncidences,
  createIncidence,
}
