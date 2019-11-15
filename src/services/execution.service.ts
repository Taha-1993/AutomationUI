import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Config } from '../environments/environment';


@Injectable()
export class ExecutionService {

  constructor(private http: HttpClient) { }

  getTestSuiteDetails(username): Observable<any> {
    return this.http.get(`${Config.API}/TestCaseExecution/GetTestSuiteDetails?username=${username}`);
  }

  getTestSuiteResults(): Observable<any> {
    return this.http.get(`${Config.API}/TestCaseExecution/GetTestSuiteResults`);
  }

  getTestScenarioResults(suiteExecutionID: number): Observable<any> {
    return this.http.get(`${Config.API}/TestCaseExecution/GetTestScenarioResults?suiteExecutionID=${suiteExecutionID}`);
  }

  executeTestSuite(projectName: string, suiteName: string, username: string) {
    return this.http.get(`${Config.API}/TestCaseExecution/ExecuteTestSuite?projectName=${projectName}&suiteName=${suiteName}&username=${username}`);
  }
}
