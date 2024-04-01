import * as buildingsController from '../controllers/buildings.controller';
import express from 'express';
import catchAsync from '../middlewares/catchAsync';

const router = express.Router();

router.get('/all', catchAsync(buildingsController.getAllBuildings));

router.get('/list', catchAsync(buildingsController.getBuildingsList));

router.get('/getById/:buildingId', catchAsync(buildingsController.getBuildingById));

export default router;
