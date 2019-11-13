import { ActionReducer } from '@ngrx/store';
import * as types from '../actions/action-types';
import { TestCaseExecutionActions } from '../actions';

export interface State {
  testSuiteDetails: any;
  testSuiteResults: any;
}

export const initialState: State = {
  testSuiteDetails: [],
  testSuiteResults: []
};

export const reducer: ActionReducer<State> = (state = initialState, action: TestCaseExecutionActions) => {
  switch (action.type) {
    case types.FETCH_TEST_SUITE_DETAILS_SUCCESS: {
      return Object.assign({}, state, { testSuiteDetails: action.payload });
    }

    case types.FETCH_TEST_SUITE_RESULTS_SUCCESS: {
      return Object.assign({}, state, { testSuiteResults: action.payload });
    }

    default:
      return state;
  }
};

export const getTestSuiteDetailsState = (state: State) => state.testSuiteDetails;
export const getTestSuiteResultsState = (state: State) => state.testSuiteResults;
