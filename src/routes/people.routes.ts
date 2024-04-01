import * as peopleController from '../controllers/people.controller';
import express from 'express';
import catchAsync from '../middlewares/catchAsync';

const router = express.Router();

router.get('/all', catchAsync(peopleController.getAllPeople));
router.get(
  '/neighbours/count/byBuildingId/:buildingId',
  catchAsync(peopleController.countNeighboursByBuildingId)
);

export default router;