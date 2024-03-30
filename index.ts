import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = 8000;

async function main() {
  const app = express();
  app.use(express.json());

  app.get('/hello', async (req, res) => {
    const allPeople = await prisma.people.findMany();
    res.send(allPeople);
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
