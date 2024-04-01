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
exports.countOwnersByBuildingId = exports.countNeighboursByBuildingId = exports.getAllPeople = void 0;
const peopleRepository = __importStar(require("../repository/people.repository"));
const date_fns_1 = require("date-fns");
function getAllPeople(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allPeople = yield peopleRepository.getAllPeople();
        res.json(allPeople);
    });
}
exports.getAllPeople = getAllPeople;
function countNeighboursByBuildingId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buildingId } = req.params;
        const currentDate = (0, date_fns_1.format)(new Date(), 'yyyy-MM-dd');
        let dates;
        if (typeof req.query.dates === 'string') {
            dates = [req.query.dates, currentDate];
        }
        else if (Array.isArray(req.query.dates) &&
            req.query.dates.every((e) => typeof e === 'string')) {
            dates = req.query.dates;
            dates.push(currentDate);
        }
        else {
            dates = [(0, date_fns_1.format)(new Date(), 'yyyy-MM-dd')];
        }
        const buildingNeighbours = yield peopleRepository.countNeighboursByBuildingId(Number(buildingId), dates);
        res.json(buildingNeighbours);
    });
}
exports.countNeighboursByBuildingId = countNeighboursByBuildingId;
function countOwnersByBuildingId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { buildingId } = req.params;
        const buildingOwners = yield peopleRepository.countOwnersByBuildingId(Number(buildingId));
        res.json(buildingOwners);
    });
}
exports.countOwnersByBuildingId = countOwnersByBuildingId;
