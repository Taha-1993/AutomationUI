import { Component, OnInit, OnDestroy } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as _ from 'lodash';
import * as reducers from '../../ngrx-store/reducers';
import * as actions from '../../ngrx-store/actions';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-case-execution',
  templateUrl: './test-case-execution.component.html',
  styleUrls: ['./test-case-execution.component.css']
})
export class TestCaseExecutionComponent implements OnInit, OnDestroy {
  selectedTabIndex: number = 0;
  isExecuteButtonEnabled: boolean;
  executeButtonSubject: Subject<any>;

  constructor(private oktaAuth: OktaAuthService, private store: Store<reducers.State>) {
    this.executeButtonSubject = new Subject<any>();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.executeButtonSubject.unsubscribe();
  }

  onRefreshButtonClicked() {
    this.oktaAuth.getUser().then(x => {
      this.store.dispatch(new actions.GetTestSuiteDetailsAction(_.first(x.email.split('@'))));
    });
  }

}
