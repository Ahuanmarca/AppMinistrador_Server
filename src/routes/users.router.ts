import express from 'express';
import * as usersController from '../controllers/users.controller';

const router = express.Router();

router.get('/all', usersController.getAll);
router.get('/getById/:userId', usersController.getById);
router.get('/getByUsername', usersController.getByUsername);

export default router;
