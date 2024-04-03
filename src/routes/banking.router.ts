import express from 'express';
import * as bankingController from '../controllers/banking.controller';

const router = express.Router();

router.get(
  '/accounts/all',
  bankingController.getAllBankAccounts
);

router.get(
  '/account/:bankAccountId/balance',
  bankingController.getBankAccountBalance
);

export default router;
