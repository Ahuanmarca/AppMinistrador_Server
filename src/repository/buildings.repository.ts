import prisma from '../config/prisma';

async function getAllBuildings() {
  const allBuildings = await prisma.buildings.findMany({
    include: {
      people_buildings_president_dniTopeople: true,
      incidences: true,
      announces: true,
    }
  });

  return allBuildings;
}

async function getBuildingsList() {
  const buildingList = await prisma.buildings.findMany({
    select: {
      id: true,
      address_type: true,
      street_address: true,
      number: true,
    }
  });

  return buildingList;
}

async function getBuildingById(buildingId: number) {
  const building = prisma.buildings.findUnique({
    where: {
      id: buildingId,
    },
    include: {
      people_buildings_president_dniTopeople: true,
      incidences: true,
      announces: true,
    }
  });
  return building;
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}
