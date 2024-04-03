"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountCashflowByMonthRange = exports.getBankAccountBalance = exports.getAllBankAccounts = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function getAllBankAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.bank_accounts.findMany();
        return result;
    });
}
exports.getAllBankAccounts = getAllBankAccounts;
function getBankAccountBalance(bankAccountId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.$queryRaw `
  
    SELECT sum(amount) AS account_balance
    FROM banking_transactions
    WHERE account_id = ${bankAccountId};
  
  `;
        return result;
    });
}
exports.getBankAccountBalance = getBankAccountBalance;
function getAccountCashflowByMonthRange(accountId, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prisma_1.default.$queryRaw `
  
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
    });
}
exports.getAccountCashflowByMonthRange = getAccountCashflowByMonthRange;
