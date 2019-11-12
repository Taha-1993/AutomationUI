import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()
export class AppLoadService {
  private http: HttpClient;
  constructor(handler: HttpBackend) {

    this.http = new HttpClient(handler);
  }
  appConfigPath: string = './assets/config/appConfig.json';

  getConfig(): any {
    let oktaconfig: any = {};
    oktaconfig = {
      issuer: environment.issuer,
      redirectUri: environment.redirectUri,
      clientId: environment.clientId
    };

    return oktaconfig;
  }

  getSettings(): Promise<any> {
    console.log('Before Http Call enviroment:: ', environment);
    const promise = this.http.get(`${this.appConfigPath}?t=${new Date().getTime()}`)
      .toPromise()
      .then(configObject => {
        console.log('From Json File ', configObject);
        environment.API = configObject['API'];
        environment.production = configObject['production'];
        environment.issuer = configObject['OktaIssuer'];
        environment.redirectUri = configObject['OktaRedirectUri'];
        environment.clientId = configObject['OktaClientId'];
        environment.currentEnvironment = configObject['currentEnvironment'];
        environment.applicationName = configObject['applicationName'];
        console.log('After Http Call enviroment:: ', environment);
        return environment;
      });

    return promise;
  }
}
