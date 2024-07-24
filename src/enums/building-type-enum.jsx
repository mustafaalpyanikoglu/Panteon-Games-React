const BuildingTypeEnum = {
  FARM: 0,
  ACADEMY: 1,
  HEADQUARTERS: 2,
  LUMBERMILL: 3,
  BARRACKS: 4,
};

const BuildingTypeNames = {
  [BuildingTypeEnum.FARM]: 'Farm',
  [BuildingTypeEnum.ACADEMY]: 'Academy',
  [BuildingTypeEnum.HEADQUARTERS]: 'Headquarters',
  [BuildingTypeEnum.LUMBERMILL]: 'LumberMill',
  [BuildingTypeEnum.BARRACKS]: 'Barracks',
};

export { BuildingTypeEnum, BuildingTypeNames };
