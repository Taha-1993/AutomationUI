import { ActionReducer } from '@ngrx/store';
import * as types from '../actions/action-types';
import { AjaxActions } from '../actions';

export interface State {
  ajaxCallsInProgress: number;
}

export const initialState: State = {
  ajaxCallsInProgress: 0,
};

export const reducer: ActionReducer<State> = (state = initialState, action: AjaxActions ) => {
  if (action.type === types.BEGIN_AJAX_CALL) {
    console.log('ajaxCallsInProgress -> ', state.ajaxCallsInProgress + 1);
    return Object.assign({}, state, { ajaxCallsInProgress: state.ajaxCallsInProgress + 1 });
  // tslint:disable-next-line:no-use-before-declare
  } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    const ajaxCallsInProgress = state.ajaxCallsInProgress > 0 ? state.ajaxCallsInProgress - 1 : 0;
    console.log('ajaxCallsInProgress -> ', ajaxCallsInProgress);
    return Object.assign({}, state, { ajaxCallsInProgress: ajaxCallsInProgress });
  } else if (action.type === types.FINISH_AJAX_CALL) {
    console.log('ajaxCallsInProgress -> ', 0);
    return Object.assign({}, state, { ajaxCallsInProgress: 0 });
  } else {
    return state;
  }
};

const actionTypeEndsInSuccess = (type: string) => {
  return type.substring(type.length - 8) === ' SUCCESS';
};

export const getAjaxCallsInProgress = (state: State) => state.ajaxCallsInProgress;
