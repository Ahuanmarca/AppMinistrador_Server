import * as usersRepository from '../repository/users.repository';

async function getAll() {
  const allUsers = await usersRepository.getAll();
  return allUsers;
}

async function getById(userId) {
  const user = await usersRepository.getById(userId);
  return user;
}

async function getByUsername(username) {
  const user = await usersRepository.getByUsername(username);
  return user;
}

export {
  getAll,
  getById,
  getByUsername,
}