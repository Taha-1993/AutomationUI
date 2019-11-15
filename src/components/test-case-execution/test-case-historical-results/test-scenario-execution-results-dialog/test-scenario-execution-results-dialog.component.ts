import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil, filter } from 'rxjs/operators';

import * as reducers from '../../../../ngrx-store/reducers';
import * as actions from '../../../../ngrx-store/actions';
import { getColumnDefinition, getGridOptions } from './grid-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-scenario-execution-results-dialog',
  templateUrl: 'test-scenario-execution-results-dialog.component.html'
})
export class TestScenarioExecutionResultsDialogComponent implements OnInit, OnDestroy {
  gridOptions: any;
  columnDefs: any;
  rowData: any;
  ngUnsubscribe: Subject<void>;

  constructor(
    public dialogRef: MatDialogRef<TestScenarioExecutionResultsDialogComponent>,
    private store: Store<reducers.State>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.gridOptions = getGridOptions(true);
      this.columnDefs = getColumnDefinition();
      this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit() {
    this.router.events
    .pipe(takeUntil(this.ngUnsubscribe),
    filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if (this.router.url.includes('error-page')) {
        this.dialogRef.close();
      }
    });

    this.store.select(reducers.getTestScenarioResultsState).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => this.rowData = data);

    setTimeout(() => {
      this.store.dispatch(new actions.GetTestScenarioResultsAction(this.data.suiteExecutionID));
    }, 0);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
