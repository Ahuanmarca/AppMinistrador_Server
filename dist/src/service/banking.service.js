"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentMonthFees = exports.getAccountCashflowByMonthRange = exports.getBankAccountBalance = exports.getAllBankAccounts = void 0;
const bankingRepository = __importStar(require("../repository/banking.repository"));
const helpers_1 = require("../utils/helpers");
const date_fns_1 = require("date-fns");
function getAllBankAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const allBankAccounts = yield bankingRepository.getAllBankAccounts();
        return allBankAccounts;
    });
}
exports.getAllBankAccounts = getAllBankAccounts;
function getBankAccountBalance(bankAccountId) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountBalance = yield bankingRepository.getBankAccountBalance(bankAccountId);
        return accountBalance;
    });
}
exports.getBankAccountBalance = getBankAccountBalance;
function getAccountCashflowByMonthRange(accountId, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, helpers_1.isValidDate)(start) || !(0, helpers_1.isValidDate)(end)) {
            return { Error: 'Please provide valid dates' };
        }
        if ((0, date_fns_1.isBefore)(new Date(start), new Date(end)) === false) {
            return { Error: 'start date must be prior to end date' };
        }
        if ((0, date_fns_1.isSameMonth)(new Date(start), new Date(end))) {
            return { Error: 'start and end must be different months' };
        }
        const cashflow = yield bankingRepository.getAccountCashflowByMonthRange(accountId, start, end);
        return cashflow;
    });
}
exports.getAccountCashflowByMonthRange = getAccountCashflowByMonthRange;
function getCurrentMonthFees(buildingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentMonthFees = yield bankingRepository.getCurrentMonthFees(buildingId);
        const paidFees = yield bankingRepository.getCurrentMonthPaidFees(buildingId);
        return {
            fees: currentMonthFees[0].debt,
            paid: paidFees[0].sum ? paidFees[0].sum : '0',
        };
    });
}
exports.getCurrentMonthFees = getCurrentMonthFees;
