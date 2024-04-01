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
exports.getBuildingById = exports.getBuildingsList = exports.getAllBuildings = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function getAllBuildings() {
    return __awaiter(this, void 0, void 0, function* () {
        const allBuildings = yield prisma_1.default.buildings.findMany({
            include: {
                people_buildings_president_dniTopeople: true,
                incidences: true,
                announces: true,
            }
        });
        const simplifiedBuildings = allBuildings.map((b) => {
            delete b.president_dni;
            const president = b.people_buildings_president_dniTopeople;
            delete b.people_buildings_president_dniTopeople;
            return Object.assign(Object.assign({}, b), { presitent: president });
        });
        return simplifiedBuildings;
    });
}
exports.getAllBuildings = getAllBuildings;
function getBuildingsList() {
    return __awaiter(this, void 0, void 0, function* () {
        const allBuildings = yield prisma_1.default.buildings.findMany();
        const buildingsList = allBuildings.map((building) => {
            return {
                id: building.id,
                title: `${building.address_type} ${building.street_address} ${building.number}`,
            };
        });
        return buildingsList;
    });
}
exports.getBuildingsList = getBuildingsList;
function getBuildingById(buildingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const building = prisma_1.default.buildings.findUnique({
            where: {
                id: buildingId,
            },
            include: {
                people_buildings_president_dniTopeople: true,
                incidences: true,
                announces: true,
            }
        });
        return building;
    });
}
exports.getBuildingById = getBuildingById;
