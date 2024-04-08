import { Request, Response } from 'express';
import * as bankingService from '../service/banking.service';

async function getAllBankAccounts(req: Request, res: Response) {
  const allBankAccounts = await bankingService.getAllBankAccounts();
  res.json(allBankAccounts);
}

async function getBankAccountBalance(req: Request, res: Response) {
  const { bankAccountId } = req.params;

  if (isNaN(Number(bankAccountId))) {
    return res.json({
      Error: `bankAccountId must be a number, instead received the value '${bankAccountId}'`,
    });
  }

  const accountBalance = await bankingService.getBankAccountBalance(
    Number(bankAccountId)
  );
  res.json(accountBalance);
}

// TODO: Improve the restrictions, provide some default values!
// If user doesn't provide the end date, it should be the current date
// If user doesn't provide the start date, it shoud be the end date minus 11 months
// The maximum range should be 12 months. If greater is provided, cap it and give a warning

async function getAccountCashflowByMonthRange(req: Request, res: Response) {
  const { accountId } = req.params;
  const { start, end } = req.query;

  if (isNaN(Number(accountId))) {
    return res.json({
      Error: `accountId must be a number, instead received the value '${accountId}'`,
    });
  }

  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.json({ Error: 'Please provide valid dates' });
  }

  const cashflow = await bankingService.getAccountCashflowByMonthRange(
    Number(accountId),
    start,
    end
  );

  res.json(cashflow);
}

async function getCurrentMonthFees(req: Request, res: Response) {
  const { buildingId } = req.params;

  if (isNaN(Number(buildingId))) {
    return res.json({
      Error: `buildingId must be a number, instead received value '${buildingId}'`
    });
  }
  
  const fees = await bankingService.getCurrentMonthFees(Number(buildingId));
  res.json(fees);
}

export {
  getAllBankAccounts,
  getBankAccountBalance,
  getAccountCashflowByMonthRange,
  getCurrentMonthFees,
};
