import * as buildingsRepository from '../repository/buildings.repository';
import { formatBuilding, formatBuildingList } from '../utils/formatters';

async function getAllBuildings() {
  const allBuildings = await buildingsRepository.getAllBuildings();
  return allBuildings.map((b) => formatBuilding(b));
}

async function getBuildingsList() {
  const buildingList = await buildingsRepository.getBuildingsList();
  return formatBuildingList(buildingList);
}

async function getBuildingById(buildingId: number) {
  const building = await buildingsRepository.getBuildingById(buildingId);
  return formatBuilding(building);
}

export {
  getAllBuildings,
  getBuildingsList,
  getBuildingById,
}