import prisma from '../config/prisma';

async function getAllPeople() {
  const allPeople = await prisma.people.findMany();
  return allPeople;
}

export {
  getAllPeople,
}
