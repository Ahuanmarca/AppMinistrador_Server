import bcrypt from 'bcrypt';
import * as usersRepository from '../repository/users.repository';
import getToken from '../utils/getToken';

async function login({ username, password }) {
  const user = await usersRepository.getByUsername(username);  
  const { hash } = user;
  const compare = await bcrypt.compare(password, hash);

  if (!user || !compare) {
    const myError = {
      code: 401,
      msg: 'Wrong credentials',
    }
    throw new Error(JSON.stringify(myError));
  }
  
  const { TOKEN_TIMEOUT } = process.env;
  const token = getToken({ userId: user.id, timeout: TOKEN_TIMEOUT })
  return token;
}

async function isExistingUser(username) {
  const existingUser = await usersRepository.getByUsername(username);
  return existingUser;
}

export {
  login,
  isExistingUser,
}



