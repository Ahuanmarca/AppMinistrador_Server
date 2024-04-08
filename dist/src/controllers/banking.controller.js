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
const bankingService = __importStar(require("../service/banking.service"));
function getAllBankAccounts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allBankAccounts = yield bankingService.getAllBankAccounts();
        res.json(allBankAccounts);
    });
}
exports.getAllBankAccounts = getAllBankAccounts;
function getBankAccountBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bankAccountId } = req.params;
        if (isNaN(Number(bankAccountId))) {
            return res.json({
                Error: `bankAccountId must be a number, instead received the value '${bankAccountId}'`,
            });
        }
        const accountBalance = yield bankingService.getBankAccountBalance(Number(bankAccountId));
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
        if (isNaN(Number(accountId))) {
            return res.json({
                Error: `accountId must be a number, instead received the value '${accountId}'`,
            });
        }
        if (typeof start !== 'string' || typeof end !== 'string') {
            return res.json({ Error: 'Please provide valid dates' });
        }
        const cashflow = yield bankingService.getAccountCashflowByMonthRange(Number(accountId), start, end);
        res.json(cashflow);
    });
}
exports.getAccountCashflowByMonthRange = getAccountCashflowByMonthRange;
function getCurrentMonthFees(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buildingId } = req.params;
        if (isNaN(Number(buildingId))) {
            return res.json({
                Error: `buildingId must be a number, instead received value '${buildingId}'`
            });
        }
        const fees = yield bankingService.getCurrentMonthFees(Number(buildingId));
        res.json(fees);
    });
}
exports.getCurrentMonthFees = getCurrentMonthFees;
