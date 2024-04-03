import { Request, Response } from 'express';
import * as bankingRepository from '../repository/banking.repository';
import { isValidDate } from '../utils/helpers';
import { isBefore, isSameMonth } from 'date-fns';

async function getAllBankAccounts(req: Request, res: Response) {
  const allBankAccounts = await bankingRepository.getAllBankAccounts();
  res.json(allBankAccounts);
}

async function getBankAccountBalance(req: Request, res: Response) {
  const { bankAccountId } = req.params;

  const accountBalance = await bankingRepository.getBankAccountBalance(Number(bankAccountId));
  res.json(accountBalance);
}

// TODO: Improve the restrictions, provide some default values!
// If user doesn't provide the end date, it should be the current date
// If user doesn't provide the start date, it shoud be the end date minus 11 months
// The maximum range should be 12 months. If greater is provided, cap it and give a warning

async function getAccountCashflowByMonthRange(req: Request, res: Response) {
  const { accountId } = req.params;
  const { start, end } = req.query;

  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.json({ Error: 'Please provide valid dates'});
  }

  if (!isValidDate(start) || !isValidDate(end)) {
    return res.json({ Error: 'Please provide valid dates'});
  } 

  if (isBefore(new Date(start), new Date(end)) === false) {
    return res.json({ Error: 'start date must be prior to end date'});
  }

  if (isSameMonth(new Date(start), new Date(end))) {
    return res.json({ Error: 'start and end must be different months' });
  }

  const cashflow = await bankingRepository.getAccountCashflowByMonthRange(
    Number(accountId),
    start,
    end
  );
  
  res.json(cashflow);
}

async function getCurrentMonthFees(req: Request, res: Response) {
  const { buildingId } = req.params;

  const currentMonthFees = await bankingRepository.getCurrentMonthFees(Number(buildingId));
  const paidFees = await bankingRepository.getCurrentMonthPaidFees(Number(buildingId));

  res.json(
    {
      fees: currentMonthFees[0].debt,
      paid: paidFees[0].sum ? paidFees[0].sum : '0',
    }
  );
}

export {
  getAllBankAccounts,
  getBankAccountBalance,
  getAccountCashflowByMonthRange,
  getCurrentMonthFees,
}
