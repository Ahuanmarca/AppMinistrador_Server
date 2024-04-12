function formatBuilding(building) {
  delete building.president_dni;
  const president = building.people_buildings_president_dniTopeople;
  delete building.people_buildings_president_dniTopeople;

  return {
    president: president,
    ...building,
  }
}

function formatBuildingList(buildings) {
  return buildings.map((building) => {
    return {
      id: building.id,
      title: `${building.address_type} ${building.street_address} ${building.number}`,
      district: building.district,
    }
  })
}

export {
  formatBuilding,
  formatBuildingList,
}
