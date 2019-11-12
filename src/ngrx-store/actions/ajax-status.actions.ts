import { Action } from '@ngrx/store';
import * as types from './action-types';

export class BeginAjaxCall implements Action {
  readonly type: string = types.BEGIN_AJAX_CALL;

  constructor() {}
}

export class AjaxCallError implements Action {
  readonly type: string = types.AJAX_CALL_ERROR;
  constructor() {}
}
export class FinishAjaxCall implements Action {
  readonly type: string = types.FINISH_AJAX_CALL;
  constructor() {}
}


export type AjaxActions
  = BeginAjaxCall
  | AjaxCallError
  |FinishAjaxCall;
