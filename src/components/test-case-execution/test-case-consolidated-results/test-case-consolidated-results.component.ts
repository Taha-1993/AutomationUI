import { Component, OnInit, OnDestroy } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Store } from '@ngrx/store';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridApi, ColumnApi, GridReadyEvent, ColDef, GridOptions } from 'ag-grid';

import * as _ from 'lodash';
import * as reducers from '../../../ngrx-store/reducers';
import * as actions from '../../../ngrx-store/actions';
import { getExecutionColumnDefinition, getGridOptions } from './grid-options';
import { ExecutionService } from '../../../services';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-case-consolidated-results',
  templateUrl: './test-case-consolidated-results.component.html'
})
export class TestCaseConsolidatedResultsComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void>;
  rowData: Array<any>;
  gridOptions: GridOptions;
  columnDefs: Array<ColDef>;
  gridApi: GridApi;
  columnApi: ColumnApi;
  username: string;

  constructor(private oktaAuth: OktaAuthService, private store: Store<reducers.State>, private executionService: ExecutionService) {
    this.ngUnsubscribe = new Subject<void>();
    this.gridOptions = getGridOptions(true);
    this.columnDefs = getExecutionColumnDefinition();
  }

  ngOnInit(): void {
    this.oktaAuth.getUser().then(x => {
      this.username = _.first(x.email.split('@'));
      this.store.dispatch(new actions.GetTestSuiteDetailsAction(this.username));
    });

    this.store.select(reducers.getTestSuiteDetailsState).pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => {
      this.rowData = x;
    });

    interval(10000).pipe(takeUntil(this.ngUnsubscribe)).subscribe(z => {
      this.oktaAuth.getUser().then(x => {
        this.store.dispatch(new actions.GetTestSuiteDetailsAction(_.first(x.email.split('@'))));
      });
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

  onRowClicked(e) {
    if (e.event.target) {
      const actionType = e.event.target.getAttribute('data-action-type');
      if (actionType === 'execute') {
        this.executionService.executeTestSuite(e.data.ProjectName, e.data.SuiteTypeName, this.username).subscribe(z => console.log(z));
        this.store.dispatch(new actions.GetTestSuiteDetailsAction(this.username));
      }
    }
  }

}
