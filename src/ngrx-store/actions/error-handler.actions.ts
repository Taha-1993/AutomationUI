import { Action } from '@ngrx/store';
import * as types from './action-types';

export class SetErrorObject implements Action {
  readonly type: string = types.SET_ERROR_OBJECT;

  constructor(public payload: any) {}
}


export type ErrorHandlerActions
  = SetErrorObject;
