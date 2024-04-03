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
function getAllBankAccounts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allBankAccounts = yield bankingRepository.getAllBankAccounts();
        res.json(allBankAccounts);
    });
}
exports.getAllBankAccounts = getAllBankAccounts;
function getBankAccountBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bankAccountId } = req.params;
        const accountBalance = yield bankingRepository.getBankAccountBalance(Number(bankAccountId));
        res.json(accountBalance);
    });
}
exports.getBankAccountBalance = getBankAccountBalance;
// TODO: Improve the restrictions, provide some default values!
// If user doesn't provide the end date, it should be the current date
// If user doesn't provide the start date, it shoud be the end date minus 11 months
// The maximum range should be 12 months. If greater is provided, cap it and give a warning
function getAccountCashflowByMonthRange(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accountId } = req.params;
        const { start, end } = req.query;
        if (typeof start !== 'string' || typeof end !== 'string') {
            return res.json({ Error: 'Please provide valid dates' });
        }
        if (!(0, helpers_1.isValidDate)(start) || !(0, helpers_1.isValidDate)(end)) {
            return res.json({ Error: 'Please provide valid dates' });
        }
        if ((0, date_fns_1.isBefore)(new Date(start), new Date(end)) === false) {
            return res.json({ Error: 'start date must be prior to end date' });
        }
        if ((0, date_fns_1.isSameMonth)(new Date(start), new Date(end))) {
            return res.json({ Error: 'start and end must be different months' });
        }
        const cashflow = yield bankingRepository.getAccountCashflowByMonthRange(Number(accountId), start, end);
        res.json(cashflow);
    });
}
exports.getAccountCashflowByMonthRange = getAccountCashflowByMonthRange;
function getCurrentMonthFees(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buildingId } = req.params;
        const currentMonthFees = yield bankingRepository.getCurrentMonthFees(Number(buildingId));
        const paidFees = yield bankingRepository.getCurrentMonthPaidFees(Number(buildingId));
        res.json({
            fees: currentMonthFees[0].debt,
            paid: paidFees[0].sum ? paidFees[0].sum : '0',
        });
    });
}
exports.getCurrentMonthFees = getCurrentMonthFees;
