import prisma from '../config/prisma';

async function getAllBuildings() {
  const allBuildings = await prisma.buildings.findMany();
  return allBuildings;
}

export {
  getAllBuildings,
}