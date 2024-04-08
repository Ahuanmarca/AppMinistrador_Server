import * as buildingsController from '../controllers/buildings.controller';
import express from 'express';
import catchAsync from '../middlewares/catchAsync';

const router = express.Router();

router.get('/all', catchAsync(buildingsController.getAllBuildings));

router.get('/list', catchAsync(buildingsController.getBuildingsList));

// @ts-expect-error - isNaN check on controller causes error
router.get('/getById/:buildingId', catchAsync(buildingsController.getBuildingById));

export default router;
