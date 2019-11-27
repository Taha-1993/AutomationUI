// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const API = 'http://localhost/TransreAPI/api';

export const environment = {
  production: true,
  API: API,
  currentEnvironment: null,
  applicationName: 'Web Automation Portal',
  issuer: 'https://dev-805228.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oafklmzylGieQ8S10h7'
};
