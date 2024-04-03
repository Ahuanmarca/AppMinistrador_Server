import prisma from '../config/prisma';

async function getAllBankAccounts() {
  const result = await prisma.bank_accounts.findMany();
  return result;
}

async function getBankAccountBalance(bankAccountId: number) {
  const result = await prisma.$queryRaw`
  
    SELECT sum(amount) AS account_balance
    FROM banking_transactions
    WHERE account_id = ${bankAccountId};
  
  `

  return result;
}

export {
  getAllBankAccounts,
  getBankAccountBalance,
}
