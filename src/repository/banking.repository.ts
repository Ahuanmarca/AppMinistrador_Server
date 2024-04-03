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
  
  `;

  return result;
}

async function getAccountCashflowByMonthRange(accountId: number, start: string, end: string) {
  const result = await prisma.$queryRaw`
  
    WITH month_series AS (
      SELECT
        date_trunc('month', generate_series(start_date, end_date, '1 month'::interval)) AS month_start
      FROM
        (SELECT 
          date_trunc('month', ${start}::date) AS start_date,
          date_trunc('month', ${end}::date) AS end_date
        ) AS date_range
    )
    SELECT
      EXTRACT(YEAR FROM ms.month_start) AS year,
      EXTRACT(MONTH FROM ms.month_start) AS month,
      COALESCE(SUM(CASE WHEN bt.amount >= 0 THEN bt.amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN bt.amount < 0 THEN bt.amount ELSE 0 END), 0) AS outcome
    FROM
      month_series ms
    LEFT JOIN banking_transactions bt
      ON EXTRACT(YEAR FROM bt.date) = EXTRACT(YEAR FROM ms.month_start)
      AND EXTRACT(MONTH FROM bt.date) = EXTRACT(MONTH FROM ms.month_start)
    WHERE bt.account_id = ${accountId}
    GROUP BY
      EXTRACT(YEAR FROM ms.month_start),
      EXTRACT(MONTH FROM ms.month_start)
    ORDER BY
      year, month;
  
  `;

  return result;
}

export {
  getAllBankAccounts,
  getBankAccountBalance,
  getAccountCashflowByMonthRange,
}
