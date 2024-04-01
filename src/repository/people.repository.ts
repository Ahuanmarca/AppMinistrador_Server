import prisma from '../config/prisma';

async function getAllPeople() {
  const allPeople = await prisma.people.findMany();
  return allPeople;
}

async function countNeighboursByBuildingId(
  buildingId: number,
  dates: Array<string>
) {

  let buildingNeighbours: { date: string, count: string }[] = await Promise.all(
    dates.map(
      async (date) => {
        const result: { date: string; count: string } = await prisma.$queryRaw`
          SELECT ${date} AS "date", count(*) AS "count" FROM properties
          INNER JOIN neighbors_to_properties
          ON neighbors_to_properties.property_id = properties.id
          WHERE properties.building_id = ${buildingId}
          AND neighbors_to_properties.starting_date < ${date} :: DATE
          AND neighbors_to_properties.ending_date IS NULL;`
        return result;
      }
    )
  );

  buildingNeighbours = buildingNeighbours.flat();
  buildingNeighbours = buildingNeighbours.map((n) => ({
    date: n.date,
    count: n.count.toString(),
  }));
  return buildingNeighbours;
}

export { getAllPeople, countNeighboursByBuildingId };
