import prisma from '../config/prisma';

async function getAll() {
  const users = await prisma.users.findMany({
    include: {
      people: true,
    }
  });
  return users;
}


async function getById(userId: number | string) {

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

async function getByUsername(username: string) {

  const user = await prisma.users.findFirst({
    where: {
      username: username,
    },
    include: {
      people: true,
    }
  })

  return user;
}

export {
  getAll,
  getById,
  getByUsername,
}
