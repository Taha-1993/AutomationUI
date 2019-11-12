import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, switchMap, debounceTime } from 'rxjs/operators';

import { JudicatureService } from '../../services';
import * as types from '../actions/action-types';
import * as actions from '../actions';
import * as reducers from '../reducers';

@Injectable()
export class JudicatureEffects {
  @Effect()
  getCaseType$: Observable<Action> = this.actions$.pipe(
  ofType(types.FETCH_CASE_TYPE),
  debounceTime(1),
  tap(() => this.store.dispatch(new actions.BeginAjaxCall())),
  switchMap(() => {
    return this.judicatureService.getCaseType().pipe(
      map(response => new actions.GetCaseTypeSuccessAction(response)));
    })
  );

  @Effect()
  getCourtCase$: Observable<Action> = this.actions$.pipe(
  ofType(types.FETCH_COURT_CASE),
  debounceTime(1),
  tap(() => this.store.dispatch(new actions.BeginAjaxCall())),
  switchMap(() => {
    return this.judicatureService.getCourtCase().pipe(
      map(response => new actions.GetCourtCaseSuccessAction(response)));
    })
  );

  constructor(
    private store: Store<reducers.State>,
    private actions$: Actions,
    private judicatureService: JudicatureService
  ) { }
}
