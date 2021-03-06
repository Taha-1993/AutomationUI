// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const API = 'https://webapi.transre.com/QAAPI/MAPQAAPI/api';

export const environment = {
  production: true,
  API: API,
  applicationName: 'Mortgage Analytics Platform',
  currentEnvironment: null,
  issuer: 'https://transre.okta.com',
  redirectUri: 'https://apps-qa.transre.com/MAPPortal/implicit/callback',
  clientId: '0oalvap68rWFDc2Rn0x7',
  POOL_MANAGEMENT_API: `${API}/PoolManagement`,
  DeleteFileServiceURL: `${API}/PoolManagement/DeletePool`,
  MASTER_API: 'http://biqa.transre.com/MicroStrategy/asp/Main.aspx?Server=ILBIAPPSQA01&Project=TransRe+BI+' +
  '%28QA%29&Port=0&evt=2048001&src=Main.aspx.2048001&documentID=CADECE3244E4FF1730042386EFB02E9F&currentViewMedia=1&visMode=0'
};
