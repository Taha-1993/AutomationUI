import { ActionReducer, MetaReducer } from '@ngrx/store';
import * as types from '../actions/action-types';
import * as _ from 'lodash';

export function middleware(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log(`Action reduced: ${action.type}`);

    const newState = Object.assign({}, state);
    if (action.type === types.FINISH_AJAX_CALL) {
      _.forEach(newState, obj => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (key !== 'userPreferences' || !obj['userPreferences']) {
              delete obj[key];
            }
          }
        }
      });
    }

    return reducer(newState, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [middleware];
