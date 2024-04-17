import * as incidencesController from '../controllers/incidences.controller';
import express from 'express';
const router = express.Router();

router.get('/all', incidencesController.getAllIncidences);
router.post('/create', incidencesController.createIncidence);
router.post('/update/status', incidencesController.updateStatus);

export default router;
