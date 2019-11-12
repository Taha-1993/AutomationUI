import { ActionReducer } from '@ngrx/store';

import * as types from '../actions/action-types';
import * as _ from 'lodash';
import { JudicatureActions } from '../actions';

export interface State {
  caseTypeList: any;
  courtCaseList: any;
}

const initialState: State = {
  caseTypeList: null,
  courtCaseList: null
};

export const reducer: ActionReducer<State> = (state = initialState, action: JudicatureActions) => {

  switch (action.type) {
    case types.FETCH_CASE_TYPE_SUCCESS: {
      const caseTypeList = action.payload;
      return Object.assign({}, state, { caseTypeList });
    }

    case types.FETCH_COURT_CASE_SUCCESS: {
      const courtCaseList = action.payload;
      return Object.assign({}, state, { courtCaseList });
    }

    default:
      return state;
  }
};

export const getCaseTypeListState = (state: State) => state.caseTypeList;
export const getCourtCaseListState = (state: State) => state.courtCaseList;
