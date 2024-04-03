import * as peopleController from '../controllers/people.controller';
import express from 'express';
import catchAsync from '../middlewares/catchAsync';

const router = express.Router();

router.get('/all', catchAsync(peopleController.getAllPeople));

router.get(
  '/neighbours/count/byBuildingId/:buildingId',
  catchAsync(peopleController.countNeighboursByBuildingId)
);

router.get(
  '/owners/count/byBuildingId/:buildingId',
  catchAsync(peopleController.countOwnersByBuildingId)
);

router.get(
  '/neighbours/get/byBuildingId/:buildingId',
  catchAsync(peopleController.getNeighboursByBuildingId)
);

router.get(
  '/users/get/byBuildingId/:buildingId',
  catchAsync(peopleController.getUsersByBuildingId)
);

export default router;
