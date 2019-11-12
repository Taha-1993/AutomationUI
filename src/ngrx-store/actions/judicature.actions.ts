import { Action } from '@ngrx/store';
import * as types from './action-types';

export class GetCaseTypeAction implements Action {
  readonly type = types.FETCH_CASE_TYPE;

  constructor() {}
}

export class GetCaseTypeSuccessAction implements Action {
  readonly type = types.FETCH_CASE_TYPE_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCourtCaseAction implements Action {
  readonly type = types.FETCH_COURT_CASE;

  constructor() {}
}

export class GetCourtCaseSuccessAction implements Action {
  readonly type = types.FETCH_COURT_CASE_SUCCESS;

  constructor(public payload: any) {}
}

export type JudicatureActions
  = GetCaseTypeAction
  | GetCaseTypeSuccessAction
  | GetCourtCaseAction
  | GetCourtCaseSuccessAction;
