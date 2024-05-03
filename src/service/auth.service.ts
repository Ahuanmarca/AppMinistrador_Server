import * as usersRepository from '../repository/users.repository';
import getToken from '../utils/getToken';
import { AuthCredentials } from '../types/AuthCredentials';

async function login({ username, password }: AuthCredentials) {
  const user = await usersRepository.getByUsername(username);

  if (!user) {
    const myError = {
      code: 401,
      msg: 'Wrong credentials',
    };
    throw new Error(JSON.stringify(myError));
  }

  const { hash } = user;
  // Bun does not support $2a$ hashes, so we need to replace them with $2b$
  const fixedHash = hash.replace(/^\$2a\$/, '$2b$');
  const compare = await Bun.password.verify(password, fixedHash);

  if (!compare) {
    const myError = {
      code: 401,
      msg: 'Wrong credentials',
    };
    throw new Error(JSON.stringify(myError));
  }

  const { TOKEN_TIMEOUT } = process.env;

  if (!TOKEN_TIMEOUT) {
    throw new Error('Internal Server Error');
  }

  const token = getToken({ userId: user.id, timeout: TOKEN_TIMEOUT });

  // phone_code and phone_number are nullable on the database...
  // phone should never be null for 'users', but it can be null for other people
  const phone = user.people.phone_code
    ? user.people.phone_code
    : '' + user.people.phone_number
    ? user.people.phone_number
    : '';

  return {
    token,
    user: {
      id: user.id,
      forename: user.people.forename,
      surname: user.people.surname,
      email: user.people.email,
      phone: phone,
      dni: user.person_dni,
      username: user.username,
      portrait_url: user.portrait_url,
    },
  };
}

async function isExistingUser(username: string) {
  const existingUser = await usersRepository.getByUsername(username);
  return existingUser;
}

export { login, isExistingUser };
