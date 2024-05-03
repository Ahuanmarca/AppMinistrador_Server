import * as buildingsRepository from '../repository/buildings.repository';
import { formatBuilding, formatBuildingList } from '../utils/formatters';

async function getAllBuildings() {
  const allBuildings = await buildingsRepository.getAllBuildings();
  return allBuildings.map((building) => formatBuilding(building));
}

async function getBuildingsList() {
  const buildingList = await buildingsRepository.getBuildingsList();
  return formatBuildingList(buildingList);
}

async function getBuildingById(buildingId: number) {
  const building = await buildingsRepository.getBuildingById(buildingId);
  if (!building) {
    throw new Error('Building not found by getBuildingById');
  }
  return formatBuilding(building);
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}