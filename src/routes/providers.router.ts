import express from 'express';
import * as providersController from '../controllers/providers.controller';

const router = express.Router();

router.get('/all', providersController.getAllProviders);

export default router;
