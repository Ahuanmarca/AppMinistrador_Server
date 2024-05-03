import prisma from '../config/prisma';
import { UserQueryRaw } from '../types/UserQueryRaw';

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

async function countOwnersByBuildingId(buildingId: number) {
  const buildingOwners = await prisma.$queryRaw<{ count: number }[]>`

    SELECT count(DISTINCT owners_to_properties.owner_dni)
    FROM properties INNER JOIN owners_to_properties
    ON owners_to_properties.property_id = properties.id
    WHERE properties.building_id = ${buildingId};`;
  
  return Number(buildingOwners[0].count);
}

async function getNeighboursByBuildingId(buildingId: number) {

  const result = await prisma.properties.findMany({
    where: {
      building_id: buildingId,
    },
    select: {
      floor: true,
      door: true,
      neighbors_to_properties: {
        select: {
          people: true,
        },
        where: {
          ending_date: null,
        }
      }
    }
  })

  return result;
}

// The query results in an array of objects that have a different
// shape than the User model and/or the users table in the database.
// Therefore, we cannot use the Prisma generated types for this query.
async function getUsersByBuildingId(buildingId: number) {

  const result = await prisma.$queryRaw<UserQueryRaw[]>`
  
    SELECT
      users.id AS id,
      people.forename,
      people.surname,
      people.email,
      CONCAT (people.phone_code, ' ', people.phone_number) AS phone,
      properties.floor AS f,
      properties.door AS d,
      users.portrait_url
    FROM
      users INNER JOIN people
      ON users.person_dni = people.dni
      INNER JOIN neighbors_to_properties
      ON people.dni = neighbors_to_properties.neighbor_dni
      INNER JOIN properties
      ON neighbors_to_properties.property_id = properties.id
    WHERE
      properties.building_id = ${buildingId}
      AND neighbors_to_properties.ending_date IS NULL;
  `;

  return result;
}

export {
  getAllPeople,
  countNeighboursByBuildingId,
  countOwnersByBuildingId,
  getNeighboursByBuildingId,
  getUsersByBuildingId,
};
