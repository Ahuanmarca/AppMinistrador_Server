import * as buildingsRepository from '../repository/buildings.repository';

async function getAllBuildings() {
  const allBuildings = await buildingsRepository.getAllBuildings();
  return allBuildings;
}

async function getBuildingsList() {
  const buildingList = await buildingsRepository.getBuildingsList();
  return buildingList;
}

async function getBuildingById(buildingId: number) {
  const building = await buildingsRepository.getBuildingById(buildingId);
  return building;
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}