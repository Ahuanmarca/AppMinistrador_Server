import express from 'express';
import ExpressError from './src/utils/ExpressError';
import cors from 'cors';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { setIo } from './src/controllers/incidences.controller';

import buildingsRouter from './src/routes/buildings.router';
import peopleRouter from './src/routes/people.routes';
import providersRouter from './src/routes/providers.router';
import bankingRouter from './src/routes/banking.router';
import dashboardRouter from './src/routes/dashboard.router';
import incidencesRouter from './src/routes/incidences.router';
import usersRouter from './src/routes/users.router';
import authRouter from './src/routes/auth.router';

const { PORT } = Bun.env;

async function main() {
  const app = express();
  console.log('Hello from a Bun in the Oven! 🍞');

  const server = http.createServer(app);
  const io = new SocketIoServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
  });
  setIo(io);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/', (req, res) => {
    res.send(`
    This is the AppMinistrador Server --
    API Docs available here: https://github.com/Ahuanmarca/AppMinistrador_Server
    `);
  });

  app.use('/buildings', buildingsRouter);
  app.use('/people', peopleRouter);
  app.use('/providers', providersRouter);
  app.use('/banking', bankingRouter);
  app.use('/dashboard', dashboardRouter);
  app.use('/incidences', incidencesRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);

  app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', "404"));
  })

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
