"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBuildingList = exports.formatBuilding = void 0;
function formatBuilding(building) {
    delete building.president_dni;
    const president = building.people_buildings_president_dniTopeople;
    delete building.people_buildings_president_dniTopeople;
    return Object.assign({ president: president }, building);
}
exports.formatBuilding = formatBuilding;
function formatBuildingList(buildings) {
    return buildings.map((building) => {
        return {
            id: building.id,
            title: `${building.address_type} ${building.street_address} ${building.number}`,
        };
    });
}
exports.formatBuildingList = formatBuildingList;
