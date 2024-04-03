import { Request, Response } from 'express';
import * as bankingRepository from '../repository/banking.repository';

async function getAllBankAccounts(req: Request, res: Response) {
  const allBankAccounts = await bankingRepository.getAllBankAccounts();
  res.json(allBankAccounts);
}

async function getBankAccountBalance(req: Request, res: Response) {
  const { bankAccountId } = req.params;

  const accountBalance = await bankingRepository.getBankAccountBalance(Number(bankAccountId));
  res.json(accountBalance);
}


export {
  getAllBankAccounts,
  getBankAccountBalance,
}
