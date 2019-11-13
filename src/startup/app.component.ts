import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router, GuardsCheckStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs';
import { tap, filter, map, expand, takeWhile, mergeMap, takeUntil } from 'rxjs/operators';

import * as reducers from '../ngrx-store/reducers';
import * as actions from '../ngrx-store/actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngUnsubscribe: Subject<void>;
  loading: number;
  selectedRouteTitle: string;
  progress: string;
  progressActionDispatchCount: number;

  constructor(
    private _ngZone: NgZone,
    private store: Store<reducers.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.progress = '';
    this.progressActionDispatchCount = 0;
    this.ngUnsubscribe = new Subject<void>();
  }

  ngOnInit() {
    this.store.select(reducers.getAjaxCallsInProgress).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(loading => {
        this._ngZone.run(() => {
          this.loading = loading;
        });
      });

    this.router.events.pipe(takeUntil(this.ngUnsubscribe)).subscribe(x => of(x).pipe(
      tap(() => this.selectedRouteTitle = ''),
      filter(event => (event instanceof NavigationCancel) || (event instanceof NavigationEnd) || (event instanceof GuardsCheckStart)),
      map(() => this.activatedRoute.firstChild),
      expand(activatedRoute => of(activatedRoute.firstChild)),
      takeWhile(activatedRoute => activatedRoute != null),
      filter(activatedRoute => activatedRoute.outlet === 'primary'),
      mergeMap(activatedRoute => activatedRoute.data),
    ).subscribe(data => this.selectedRouteTitle += data.title ? ` - ${data.title}` : ''));
  }
}
