import prisma from '../config/prisma';

async function getAllBuildings() {
  const allBuildings = await prisma.buildings.findMany({
    include: {
      people_buildings_president_dniTopeople: true,
      incidences: true,
      announces: true,
    }
  });

  const simplifiedBuildings = allBuildings.map((b) => {
    delete b.president_dni;
    const president = b.people_buildings_president_dniTopeople;
    delete b.people_buildings_president_dniTopeople;
    
    return {
      ...b,
      presitent: president,
    }
  })

  return simplifiedBuildings;
}

async function getBuildingsList() {
  const allBuildings = await prisma.buildings.findMany();
  const buildingsList = allBuildings.map((building) => {
    return {
      id: building.id,
      title: `${building.address_type} ${building.street_address} ${building.number}`,
    }
  })  

  return buildingsList;
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