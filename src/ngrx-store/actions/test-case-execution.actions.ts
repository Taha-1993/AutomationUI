import { Action } from '@ngrx/store';
import * as types from './action-types';

export class GetTestSuiteDetailsAction implements Action {
  readonly type = types.FETCH_TEST_SUITE_DETAILS;

  constructor (public payload: any) {}
}

export class GetTestSuiteDetailsSuccessAction implements Action {
  readonly type = types.FETCH_TEST_SUITE_DETAILS_SUCCESS;

  constructor (public payload: any) {}
}

export class GetTestSuiteResultsAction implements Action {
  readonly type = types.FETCH_TEST_SUITE_RESULTS;

  constructor () {}
}

export class GetTestSuiteResultsSuccessAction implements Action {
  readonly type = types.FETCH_TEST_SUITE_RESULTS_SUCCESS;

  constructor (public payload: any) {}
}

export type TestCaseExecutionActions
  = GetTestSuiteDetailsAction
  | GetTestSuiteDetailsSuccessAction
  | GetTestSuiteResultsAction
  | GetTestSuiteResultsSuccessAction;
