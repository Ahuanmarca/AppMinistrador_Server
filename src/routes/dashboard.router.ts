import express from 'express';
import * as dashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get(
  '/building/:buildingId/bankAccount/:accountId',
  dashboardController.getDashboardDataByBuildingId
);

export default router;
