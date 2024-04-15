import jwt from 'jsonwebtoken';

function getToken({ userId, timeout }) {

  const payload = {
    userId,
  };

  const { TOKEN_SECRET_WORD } = process.env;

  const options = {
    expiresIn: timeout,
  }

  const token = jwt.sign(payload, TOKEN_SECRET_WORD, options);
  return token;
}

export default getToken;
