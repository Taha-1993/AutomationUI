import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import * as reducers from '../../ngrx-store/reducers';
import * as _ from 'lodash';
import { ExecutionService } from '../../services';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export interface SuiteDetails {
  project_name: string;
  suite_type_name: string;
  description: string;
}

export interface Results {
  ProjectName: string;
  SuiteName: string;
  ScenarioDescription: string;
  ExecutionStatus: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void>;
  isCheckBoxEmpty = true;

  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<SuiteDetails>(true, []);

  displayedColumns: string[] = ['select', 'app_name', 'suite_name', 'Description', 'status'];
  parsedSuiteDetails = new MatTableDataSource<SuiteDetails>([]);
  // parsedSuiteName: any = [];

  resultsDisplayedColumns: string[] = ['ProjectName', 'SuiteName', 'ScenarioDescription', 'ExecutionStatus'];
  parsedResultDetails = new MatTableDataSource<Results>([]);

  constructor(private store: Store<reducers.State>, private router: Router, private executionService: ExecutionService) {
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit() {
    this.executionService.getTestSuitesDetails().subscribe(data => {
      console.log(data);
      this.parsedSuiteDetails.data = data;
    });

    this.executionService.getAllTestResults().subscribe(data => {
      console.log(data);
      this.parsedResultDetails.data = data;
    });

    this.selection.onChange.subscribe(x => this.isCheckBoxEmpty = x.source.isEmpty());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.parsedSuiteDetails.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.parsedSuiteDetails.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SuiteDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.project_name + 1}`;
  }

  executeSuites() {
    const datatoPost = { names: _.map((this.selection as any)._selected, 'suite_type_name'), apps_name: _.map((this.selection as any)._selected, 'project_name') };
    if (datatoPost) {
      this.executionService.execute_suites(datatoPost).subscribe(data => {
        if (data === true) {
          this.getConsolidatedResult();
        }
      });
    }
  }

  getConsolidatedResult() {
    const suiteNametoPost = { apps_name: _.map((this.selection as any)._selected, 'project_name') };
    this.executionService.GetTestSuitesConsolidatedResult(suiteNametoPost).subscribe(data => {
      if (data) {
        this.updateTable(data);
      }
    });
  }

  updateTable(data) {
    for (const row of this.parsedSuiteDetails.data) {
      const project_status = _.find(data, a => a.project_name === row.project_name);
      row['status'] = project_status ? project_status.execution_status : '';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
