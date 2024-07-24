module.exports = Object.freeze({
  // base url
  API_URL: 'https://panteon-games-chexbllmna-ew.a.run.app/api/',
  // API_URL: 'https://localhost:7206/api/',

  // auths routes
  LOGIN: 'Auths/Login',
  REGISTER: 'Auths/Register',
  REFRESH_TOKEN: 'Auths/RefreshToken',
  REVOKE_TOKEN: 'Auths/RevokeToken',
  CHANGE_PASSWORD: 'Auths/ChangePassword',

  // building configs
  BUILDING_CONFIGS: 'BuildingConfigs',
  BUILDING_CONFIGS_WITH_PAGINATION: 'GetListWithPagination',
  GET_BUILDING_TYPE_LIST: 'GetBuildingTypeList',

});