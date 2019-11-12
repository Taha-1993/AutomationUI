import { ActionReducer } from '@ngrx/store';

import * as types from '../actions/action-types';
import { ErrorHandlerActions } from '../actions';

export interface State {
  errorHandlerObject: any;
}

const initialState: State = {
  errorHandlerObject: null,
};

export const reducer: ActionReducer<State> = (state = initialState, action: ErrorHandlerActions) => {

  switch (action.type) {
    case types.SET_ERROR_OBJECT: {
      const errorHandlerObject = action.payload;
      return Object.assign({}, state, { errorHandlerObject });
    }

    default:
      return state;
  }
};

export const getErrorHandlerObjectState = (state: State) => state.errorHandlerObject;
