import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as reducers from '../../ngrx-store/reducers';
import * as actions from '../../ngrx-store/actions';
import * as constants from '../../constants/left-menu';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  statusCode;
  statusText;
  message;
  landingPageRoute = constants.JUDICATURE_ROUTE;

  isOpened = false;
  constructor(private store: Store<reducers.State>) { }

  ngOnInit() {
    this.store.select(reducers.getErrorHandlerObjectState).pipe(take(1)).subscribe(error => {
      if (error) {
        this.statusCode = error.status || error.name;
        this.statusText = error.statusText || error.message;
        this.message = error.stack ? error.stack.split('\n') : [error.message];
      }
      this.store.dispatch(new actions.FinishAjaxCall());
    });
  }

  changeValue(value) {
    this.isOpened = !value;
  }

}
