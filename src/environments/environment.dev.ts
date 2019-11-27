// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=dev` then `environment.dev.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const API = 'https://webapi.transre.com/DEVAPI/AutomationAPI/api';

export const environment = {
  production: false,
  API: API,
  applicationName: 'Web Automation Portal',
  currentEnvironment: null,
  issuer: 'https://dev-805228.oktapreview.com/oauth2/default',
  redirectUri: 'https:/apps-dev.transre.com/QAAutomation/implicit/callback',
  clientId: '0oag8mp1lbHnbTpfX0h7'
};
