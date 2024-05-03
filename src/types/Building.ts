// This type must match the returned object from:
// - getAllBuildings() in the repository (returns array of Building)
// - getBuildingById() in the repository

export interface Building {
  id: number,
  address_type: string,
  street_address: string,
  number: string,
  district: string,
  postal_code: string,
  locality: string,
  province: string,
  country: string,
  admin_dni: string,
  president_dni: string,
  build_year: number,
  floors: number,
  elevators: number,
  parking_slots: number,
  image_url: string;
  people_buildings_president_dniTopeople: {
    id: number;
    forename: string;
    surname: string;
    second_surname: string | null;
    email: string | null;
    phone_code: string | null;
    phone_number: string | null;
    birth: Date | null;
    dni: string | null;
  };
  incidences: Array<{
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    user_dni: string;
    building_id: number;
    provider_id: number | null;
    date: Date;
    time: Date;
    status: string;
    category: string;
    users: {
      id: number;
      person_dni: string;
      username: string;
      hash: string;
      is_validated: boolean;
      is_system_admin: boolean;
      portrait_url: string | null;
      people: {
        id: number;
        forename: string;
        surname: string;
        second_surname: string | null;
        email: string | null;
        phone_code: string | null;
        phone_number: string | null;
        birth: Date | null;
        dni: string | null;
      };
    };
  }>;
  announces: Array<{
    id: number;
    title: string;
    description: string;
    building_id: number;
    date: Date;
    time: Date;
  }>;
}
