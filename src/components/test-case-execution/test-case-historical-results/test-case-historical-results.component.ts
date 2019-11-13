import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { GridApi, ColumnApi, GridReadyEvent, ColDef, GridOptions } from 'ag-grid';

import * as _ from 'lodash';
import * as reducers from '../../../ngrx-store/reducers';
import * as actions from '../../../ngrx-store/actions';
import { getExecutionColumnDefinition, getGridOptions } from './grid-options';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-case-historical-results',
  templateUrl: './test-case-historical-results.component.html'
})
export class TestCaseHistoricalResultsComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void>;
  rowData: Array<any>;
  gridOptions: GridOptions;
  columnDefs: Array<ColDef>;
  gridApi: GridApi;
  columnApi: ColumnApi;

  constructor(private store: Store<reducers.State>) {
    this.ngUnsubscribe = new Subject<void>();
    this.gridOptions = getGridOptions(true);
    this.columnDefs = getExecutionColumnDefinition();
  }

  ngOnInit(): void {
    this.store.dispatch(new actions.GetTestSuiteResultsAction());

    this.store.select(reducers.getTestSuiteResultsState).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
      this.rowData = x;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
   }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    if (params.api) {
      params.api.sizeColumnsToFit();
    }
  }

  onRowClicked(e) { }

}