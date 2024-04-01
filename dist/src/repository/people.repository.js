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
exports.countOwnersByBuildingId = exports.countNeighboursByBuildingId = exports.getAllPeople = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
function getAllPeople() {
    return __awaiter(this, void 0, void 0, function* () {
        const allPeople = yield prisma_1.default.people.findMany();
        return allPeople;
    });
}
exports.getAllPeople = getAllPeople;
function countNeighboursByBuildingId(buildingId, dates) {
    return __awaiter(this, void 0, void 0, function* () {
        let buildingNeighbours = yield Promise.all(dates.map((date) => __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.default.$queryRaw `

          SELECT ${date} AS "date", count(*) AS "count" FROM properties
          INNER JOIN neighbors_to_properties
          ON neighbors_to_properties.property_id = properties.id
          WHERE properties.building_id = ${buildingId}
          AND neighbors_to_properties.starting_date < ${date} :: DATE
          AND neighbors_to_properties.ending_date IS NULL;`;
            return result;
        })));
        buildingNeighbours = buildingNeighbours.flat();
        buildingNeighbours = buildingNeighbours.map((n) => ({
            date: n.date,
            count: n.count.toString(),
        }));
        return buildingNeighbours;
    });
}
exports.countNeighboursByBuildingId = countNeighboursByBuildingId;
function countOwnersByBuildingId(buildingId) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildingOwners = yield prisma_1.default.$queryRaw `

    SELECT count(DISTINCT owners_to_properties.owner_dni)
    FROM properties INNER JOIN owners_to_properties
    ON owners_to_properties.property_id = properties.id
    WHERE properties.building_id = ${buildingId};`;
        return Number(buildingOwners[0].count);
    });
}
exports.countOwnersByBuildingId = countOwnersByBuildingId;
