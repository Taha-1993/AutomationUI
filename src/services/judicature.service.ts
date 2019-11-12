import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as Config } from '../environments/environment';


@Injectable()
export class JudicatureService {

  constructor(private http: HttpClient) { }

  getCaseType(): Observable<any> {
    return this.http.get(`${Config.API}/Judicature/GetCaseType`);
  }
  getCourtCase(): Observable<any> {
    return this.http.get(`${Config.API}/Judicature/GetCourtCase`);
  }
}
