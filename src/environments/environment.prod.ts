const API = 'https://transrewebapi.transre.com/TransreAPI/MAPQAAPI/api';

export const environment = {
  production: true,
  API: API,
  applicationName: 'Mortgage Analytics Platform',
  currentEnvironment: null,
  POOL_MANAGEMENT_API: `${API}/PoolManagement`,
  MASTER_API: 'http://bip.transre.com/MicroStrategy/asp/Main.aspx?Server=ILBIAPPSP01&Project=Transre%7C+' +
  'Executive&Port=0&evt=2048001&src=Main.aspx.2048001&documentID=CADECE3244E4FF1730042386EFB02E9F&currentViewMedia=1&visMode=0'
};
