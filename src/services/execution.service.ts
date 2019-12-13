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

  executeTestSuite(testSuiteList) {
    return this.http.post(`${Config.API}/TestCaseExecution/ExecuteTestSuite`, JSON.stringify(testSuiteList));
  }

  exportTestReport(filePath: string): Observable<any> {
    return this.http.get(`${Config.API}/TestCaseExecution/ExportTestReport?filePath=${filePath}`, { responseType: 'text' });
  }
}
