import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from '../ngrx-store/actions';
import * as reducers from '../ngrx-store/reducers';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(
    private readonly injector: Injector,
    private store: Store<reducers.State>) { }

  handleError(error: Error | HttpErrorResponse) {
    console.error(error);

    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {

      if (!navigator.onLine) {
        this.store.dispatch(new actions.SetErrorObject({
          status: 503,
          statusText: 'No Internet Connection'
        }));
      } else if (error.status === 401) {
        router.navigate(['/login']);
        return;
      }
    }
    // if ((error as any).message.includes(`Uncaught (in promise)`)) {
    if (error.message.includes(`Unable to get property 'sub' of undefined or null reference`)) {
      // setTimeout(() => {
        // router.navigate(['/login']);
        // (window as any).reload();
        location.reload();
      // }, 500);
      return;
    }
    if (error.message.includes(`OAuth`)) {
      router.navigate(['/login']);
      return;
    }
    this.store.dispatch(new actions.SetErrorObject(error));

    router.navigate(['/error-page']);
  }
}
