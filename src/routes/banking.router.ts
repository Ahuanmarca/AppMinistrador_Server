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

router.get(
  '/account/:accountId/getCashflow',
  bankingController.getAccountCashflowByMonthRange
);

router.get(
  '/building/:buildingId/fees',
  bankingController.getCurrentMonthFees
);

export default router;
