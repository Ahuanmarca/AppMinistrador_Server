import * as peopleRepository from '../repository/people.repository';
import { format } from 'date-fns';
import { isValidDate } from '../utils/helpers';

async function getAllPeople() {
  const allPeople = await peopleRepository.getAllPeople();
  return allPeople;
}

async function countNeighboursByBuildingId(
  buildingId: number,
  dates: Array<string>
) {

  const currentDate = format(new Date(), 'yyyy-MM-dd');

  if (dates.every((date) => isValidDate(date)) === false) {
    return { Error: 'peopleService received invalid dates'};
  }
  
  const buildingNeighbours = await peopleRepository.countNeighboursByBuildingId(
    buildingId,
    [...dates, currentDate]
  );

  return buildingNeighbours;
}

async function countOwnersByBuildingId(buildingId: number) {
  const ownersCount = await peopleRepository.countOwnersByBuildingId(buildingId);
  return ownersCount;
}

async function getNeighboursByBuildingId(buildinfId: number) {
  const buildingNeighbours = await peopleRepository.getNeighboursByBuildingId(buildinfId);
  return buildingNeighbours;
}

async function getUsersByBuildingId(buildingId: number) {
  const buildingUsers = await peopleRepository.getUsersByBuildingId(buildingId);
  return buildingUsers;
}

export {
  getAllPeople,
  countNeighboursByBuildingId,
  countOwnersByBuildingId,
  getNeighboursByBuildingId,
  getUsersByBuildingId,
}
