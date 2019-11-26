import { Action } from '@ngrx/store';
import * as types from './action-types';

export class ResetResponseStateAction implements Action {
  readonly type = types.RESET_RESPONSE_STATE;

  constructor() {}
}

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

export class GetTestScenarioResultsAction implements Action {
  readonly type = types.FETCH_TEST_SCENARIO_RESULTS;

  constructor (public payload: any) {}
}

export class GetTestScenarioResultsSuccessAction implements Action {
  readonly type = types.FETCH_TEST_SCENARIO_RESULTS_SUCCESS;

  constructor (public payload: any) {}
}

export class ExecuteTestSuiteAction implements Action {
  readonly type = types.EXECUTE_TEST_SUITE;

  constructor (public payload: any) {}
}

export class ExecuteTestSuiteSuccessAction implements Action {
  readonly type = types.EXECUTE_TEST_SUITE_SUCCESS;

  constructor (public payload: any) {}
}

export type TestCaseExecutionActions
  = ResetResponseStateAction
  | GetTestSuiteDetailsAction
  | GetTestSuiteDetailsSuccessAction
  | GetTestSuiteResultsAction
  | GetTestSuiteResultsSuccessAction
  | GetTestScenarioResultsAction
  | GetTestScenarioResultsSuccessAction
  | ExecuteTestSuiteAction
  | ExecuteTestSuiteSuccessAction;
