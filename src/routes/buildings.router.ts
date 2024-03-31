import * as buildingsController from '../controllers/buildings.controller';
import express from 'express';

const router = express.Router();

router.get('/all', buildingsController.getAllBuildings);

export default router;
