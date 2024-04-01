import prisma from '../config/prisma';

async function getAllPeople() {
  const allPeople = await prisma.people.findMany();
  return allPeople;
}

async function getNeighboursByBuildingId(buildingId: number): Promise<number> {
  const buildingNeighbours = await prisma.$queryRaw`
 
      SELECT count(*) FROM properties
      INNER JOIN neighbors_to_properties
      ON neighbors_to_properties.property_id = properties.id
      WHERE properties.building_id = ${buildingId}
      AND neighbors_to_properties.ending_date IS NULL;`;

// TypeScript can't infer the 'buildingNeighbours' type,
// so we use type assertion to specify it
// ...Prisma returns an array with one object => [{ count: 30n }] (30n is a bigInt)
  return parseInt((buildingNeighbours as [{ count: string }])[0].count);
}

export { getAllPeople, getNeighboursByBuildingId };
