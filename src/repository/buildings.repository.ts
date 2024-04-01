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

export {
  getAllBuildings,
}