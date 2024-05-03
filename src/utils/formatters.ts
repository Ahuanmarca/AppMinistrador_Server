import { Building } from '../types/Building';

// I had to pick all the fields manually just to
// omit the fields that are not needed in the frontend
// and to avoid exposing sensitive data

function formatBuilding(building: Building) {
  return {
    id: building.id,
    address_type: building.address_type,
    street_address: building.street_address,
    number: building.number,
    district: building.district,
    postal_code: building.postal_code,
    locality: building.locality,
    province: building.province,
    country: building.country,
    admin_dni: building.admin_dni,
    president_dni: building.president_dni,
    build_year: building.build_year,
    floors: building.floors,
    elevators: building.elevators,
    parking_slots: building.parking_slots,
    image_url: building.image_url,
    president: building.people_buildings_president_dniTopeople,
    announces: building.announces,
    incidences: building.incidences.map((incidence) => {
      return {
        id: incidence.id,
        title: incidence.title,
        description: incidence.description,
        image_url: incidence.image_url,
        user_dni: incidence.user_dni,
        building_id: incidence.building_id,
        provider_id: incidence.provider_id,
        date: incidence.date,
        time: incidence.time,
        status: incidence.status,
        category: incidence.category,
        users: {
          id: incidence.users.id,
          person_dni: incidence.users.person_dni,
          username: incidence.users.username,
          is_validated: incidence.users.is_validated,
          is_system_admin: incidence.users.is_system_admin,
          portrait_url: incidence.users.portrait_url,
          people: {
            id: incidence.users.people.id,
            forename: incidence.users.people.forename,
            surname: incidence.users.people.surname,
            second_surname: incidence.users.people.second_surname,
            email: incidence.users.people.email,
            phone_code: incidence.users.people.phone_code,
            phone_number: incidence.users.people.phone_number,
            birth: incidence.users.people.birth,
            dni: incidence.users.people.dni,
          },
        },
      };
    }),
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
