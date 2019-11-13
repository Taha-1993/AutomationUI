import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-case-execution',
  templateUrl: './test-case-execution.component.html'
})
export class TestCaseExecutionComponent implements OnInit, OnDestroy {
  selectedTabIndex: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

}
