import jwt from 'jsonwebtoken';

function getToken({ userId, timeout }: { userId: string | number, timeout: string }) {

  const payload = {
    userId,
  };

  const { TOKEN_SECRET_WORD } = process.env;
  if (!TOKEN_SECRET_WORD) {
    throw new Error('Internal Server Error');
  }

  const options = {
    expiresIn: timeout,
  }

  const token = jwt.sign(payload, TOKEN_SECRET_WORD, options);
  return token;
}

export default getToken;
