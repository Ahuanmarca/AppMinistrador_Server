import prisma from '../config/prisma';

async function getAll() {
  const users = await prisma.users.findMany({
    include: {
      people: true,
    }
  });
  return users;
}


async function getById(userId) {

  const user = await prisma.users.findUnique({
    where: {
      id: Number(userId),
    },
    include: {
      people: true,
    }
  })

  return user;
}



export {
  getById,
  getAll,
}