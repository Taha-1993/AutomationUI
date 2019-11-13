import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { ExecutionService } from '../../services';
import * as types from '../actions/action-types';
import * as actions from '../actions';
import * as reducers from '../reducers';

@Injectable()
export class TestCaseExecutionEffects {

  @Effect()
  getTestSuiteDetails$: Observable<Action> = this.actions$.pipe(
  ofType(types.FETCH_TEST_SUITE_DETAILS),
  debounceTime(1),
  tap(() => this.store.dispatch(new actions.BeginAjaxCall())),
  map((action: any) => action.payload),
  switchMap((payload) => {
    return this.testCaseExecutionService.getTestSuiteDetails(payload).pipe(
      map(data => new actions.GetTestSuiteDetailsSuccessAction(data)));
    })
  );

  @Effect()
  getTestSuiteResults$: Observable<Action> = this.actions$.pipe(
  ofType(types.FETCH_TEST_SUITE_RESULTS),
  debounceTime(1),
  tap(() => this.store.dispatch(new actions.BeginAjaxCall())),
  switchMap(() => {
    return this.testCaseExecutionService.getTestSuiteResults().pipe(
      map(data => new actions.GetTestSuiteResultsSuccessAction(data)));
    })
  );

  constructor(
    private store: Store<reducers.State>,
    private actions$: Actions,
    private testCaseExecutionService: ExecutionService
  ) { }
}
