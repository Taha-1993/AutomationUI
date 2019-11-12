import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Config } from '../environments/environment';


@Injectable()
export class ExecutionService {

  constructor(private http: HttpClient) { }

  getTestSuitesDetails(): Observable<any> {
    return this.http.get(`${Config.API}/values/GetTestSuitesDetails`);
  }

  getAllTestResults(): Observable<any> {
    return this.http.get(`${Config.API}/values/GetAllTestResults`);
  }

  execute_suites(names): Observable<any> {
    return this.http.post(`${Config.API}/values/Execute_Suites`, names);
  }

  GetTestSuitesConsolidatedResult(project_names): Observable<any> {
    return this.http.post(`${Config.API}/values/GetTestSuitesConsolidatedResult`, project_names);
  }

}
