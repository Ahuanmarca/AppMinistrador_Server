import * as bankingRepository from '../repository/banking.repository';
import { isValidDate } from '../utils/helpers';
import { isBefore, isSameMonth } from 'date-fns';

async function getAllBankAccounts() {
  const allBankAccounts = await bankingRepository.getAllBankAccounts();
  return allBankAccounts;
}

async function getBankAccountBalance(bankAccountId: number) {
  const accountBalance = await bankingRepository.getBankAccountBalance(
    bankAccountId
  );
  return accountBalance;
}

async function getAccountCashflowByMonthRange(
  accountId: number,
  start: string,
  end: string
) {
  if (!isValidDate(start) || !isValidDate(end)) {
    return { Error: 'Please provide valid dates' };
  }

  if (isBefore(new Date(start), new Date(end)) === false) {
    return { Error: 'start date must be prior to end date' };
  }

  if (isSameMonth(new Date(start), new Date(end))) {
    return { Error: 'start and end must be different months' };
  }

  const cashflow = await bankingRepository.getAccountCashflowByMonthRange(
    accountId,
    start,
    end
  );
  return cashflow;
}

async function getCurrentMonthFees(buildingId: number) {
  
  const currentMonthFees = await bankingRepository.getCurrentMonthFees(
    buildingId
  );

  const paidFees = await bankingRepository.getCurrentMonthPaidFees(buildingId);

  return {
    fees: currentMonthFees[0].debt,
    paid: paidFees[0].sum ? paidFees[0].sum : 0,
  };
}

export {
  getAllBankAccounts,
  getBankAccountBalance,
  getAccountCashflowByMonthRange,
  getCurrentMonthFees,
};
