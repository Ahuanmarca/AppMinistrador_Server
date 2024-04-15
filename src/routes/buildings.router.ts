import * as buildingsController from '../controllers/buildings.controller';
import express from 'express';
import catchAsync from '../middlewares/catchAsync';
import requireLogin from '../middlewares/requireLogin';

const router = express.Router();

router.get(
  '/all', requireLogin,
  catchAsync(buildingsController.getAllBuildings));

router.get(
  '/list', requireLogin,
  catchAsync(buildingsController.getBuildingsList));

router.get(
  '/getById/:buildingId', requireLogin,
  // @ts-expect-error - isNaN check on controller causes error
  catchAsync(buildingsController.getBuildingById));

export default router;
