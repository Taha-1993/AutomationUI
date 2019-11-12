import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import * as actions from '../../ngrx-store/actions';
import * as reducers from '../../ngrx-store/reducers';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'judicature',
  templateUrl: './judicature.component.html',
  styleUrls: ['./judicature.component.css'],
})
export class JudicatureComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<void>;

  constructor(private store: Store<reducers.State>, private router: Router) {
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
