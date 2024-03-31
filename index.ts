import './src/config/environment';
import express from 'express';
import buildingsRouter from './src/routes/buildings.router';
import ExpressError from './src/utils/ExpressError';

const { PORT } = process.env;

async function main() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('hello, world');
  });

  app.use('/buildings', buildingsRouter);

  app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', "404"));
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
