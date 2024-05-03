import prisma from '../config/prisma';
import { Building } from '../types/Building';

async function getAllBuildings() {
  const allBuildings = await prisma.buildings.findMany({
    include: {
      people_buildings_president_dniTopeople: true,
      incidences: {
        include: {
          users: {
            include: {
              people: true,
            },
          },
        },
      },
      announces: true,
    },
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
      district: true,
    },
  });

  return buildingList;
}

async function getBuildingById(buildingId: number) {
  const building: Building | null = await prisma.buildings.findUnique({
    where: {
      id: buildingId,
    },
    include: {
      people_buildings_president_dniTopeople: true,
      incidences: {
        include: {
          users: {
            include: {
              people: true,
            },
          },
        },
      },
      announces: true,
    },
  });
  return building;
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
};
