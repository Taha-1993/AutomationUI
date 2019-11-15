// tslint:disable
import { createSelector } from 'reselect';
import { combineReducers } from '@ngrx/store';

export * from './middleware.reducer';
import * as ajaxStateReducer from './ajax-state.reducer';
import * as errorHandlerReducer from './error-handler.reducer';
import * as testCaseExecutionReducer from './test-case-execution.reducer';

export interface State {
  ajaxState: ajaxStateReducer.State;
  errorHander: errorHandlerReducer.State;
  testCaseExecution: testCaseExecutionReducer.State;
  reducer: any;
}

const reducers = {
  ajaxState: ajaxStateReducer.reducer,
  errorHandler: errorHandlerReducer.reducer,
  testCaseExecution: testCaseExecutionReducer.reducer
};

const rootReducer: any = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return rootReducer(state, action);
}

export const getAjaxState = (state: State) => state.reducer.ajaxState;
export const getErrorHandlerState = (state: State) => state.reducer.errorHandler;
export const getTestCaseExecutionState = (state: State) => state.reducer.testCaseExecution;

export const getAjaxCallsInProgress = createSelector(getAjaxState, ajaxStateReducer.getAjaxCallsInProgress);
export const getErrorHandlerObjectState = createSelector(getErrorHandlerState, errorHandlerReducer.getErrorHandlerObjectState);

export const getTestSuiteDetailsState = createSelector(getTestCaseExecutionState, testCaseExecutionReducer.getTestSuiteDetailsState);
export const getTestSuiteResultsState = createSelector(getTestCaseExecutionState, testCaseExecutionReducer.getTestSuiteResultsState);
export const getTestScenarioResultsState = createSelector(getTestCaseExecutionState, testCaseExecutionReducer.getTestScenarioResultsState);
