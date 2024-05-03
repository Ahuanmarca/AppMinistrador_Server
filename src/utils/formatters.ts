import { buildings } from '@prisma/client';
import { Person } from '../types/Person';
import _ from 'lodash';

// 'buildings' is the type of the object returned by Prisma
interface Building extends buildings {
  people_buildings_president_dniTopeople?: Person;
}

function formatBuilding(building: Building) {
  // Change the name of the key for better readability
  const buildingClone = _.cloneDeep(building);
  const president = buildingClone.people_buildings_president_dniTopeople;
  delete buildingClone.people_buildings_president_dniTopeople;

  // I would also remove the 'presindent_dni' key, but I get an error
  // delete buildingClone.president_dni;

  return {
    president: president,
    ...buildingClone,
  };
}

// The type annotation matches the returned object from
// the getBuildingsList() function in the repository
function formatBuildingList(
  buildings: Array<{
    number: string | null;
    id: number;
    address_type: string | null;
    street_address: string | null;
    district: string | null;
  }>
) {
  return buildings.map((building) => {
    return {
      id: building.id,
      title: `${building.address_type} ${building.street_address} ${building.number}`,
      district: building.district,
    };
  });
}

export { formatBuilding, formatBuildingList };
