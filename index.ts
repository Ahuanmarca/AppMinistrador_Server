import './src/config/environment';
import express from 'express';
import buildingsRouter from './src/routes/buildings.router';
import peopleRouter from './src/routes/people.routes';
import providersRouter from './src/routes/providers.router';
import bankingRouter from './src/routes/banking.router';
import dashboardRouter from './src/routes/dashboard.router';
import incidencesRouter from './src/routes/incidences.router';
import ExpressError from './src/utils/ExpressError';
import cors from 'cors';

const { PORT } = process.env;

async function main() {
  const app = express();
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

  app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', "404"));
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
