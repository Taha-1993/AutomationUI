// tslint:disable
import { createSelector } from 'reselect';
import { combineReducers } from '@ngrx/store';

export * from './middleware.reducer';
import * as ajaxStateReducer from './ajax-state.reducer';
import * as errorHandlerReducer from './error-handler.reducer';
import * as judicatureReducer from './judicature.reducer';

export interface State {
  ajaxState: ajaxStateReducer.State;
  errorHander: errorHandlerReducer.State;
  reportComponent: judicatureReducer.State;
  reducer: any;
}

const reducers = {
  ajaxState: ajaxStateReducer.reducer,
  errorHander: errorHandlerReducer.reducer,
  judicature: judicatureReducer.reducer
};

const rootReducer: any = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return rootReducer(state, action);
}

export const getAjaxState = (state: State) => state.reducer.ajaxState;
export const getErrorHandlerState = (state: State) => state.reducer.errorHander;
export const getJudicaturetState = (state: State) => state.reducer.judicature;

export const getAjaxCallsInProgress = createSelector(getAjaxState, ajaxStateReducer.getAjaxCallsInProgress);
export const getErrorHandlerObjectState = createSelector(getErrorHandlerState, errorHandlerReducer.getErrorHandlerObjectState);

export const getCaseTypeListState = createSelector(getJudicaturetState, judicatureReducer.getCaseTypeListState);
export const getCourtCaseListState = createSelector(getJudicaturetState, judicatureReducer.getCourtCaseListState);
