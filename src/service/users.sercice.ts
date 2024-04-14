import * as usersRepository from '../repository/users.repository';

async function getAll() {
  const allUsers = await usersRepository.getAll();
  return allUsers;
}

async function getById(userId) {
  const user = await usersRepository.getById(userId);
  return user;
}






export {
  getById,
  getAll,
}