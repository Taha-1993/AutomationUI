import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OktaAuthService } from '@okta/okta-angular';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import * as actions from '../../ngrx-store/actions';
import * as reducers from '../../ngrx-store/reducers';
import * as constants from '../../constants/left-menu';
import { environment as Config } from '../../environments/environment';
import * as _ from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() componentTitle: string;
  @Output() onMenuClick = new EventEmitter<any>();
  isAuthenticated: boolean;
  username: string;
  currentEnvironment: string;
  applicationName: string;
  applicationTitle: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public oktaAuth: OktaAuthService, private store: Store<reducers.State>,
    public router: Router,
    private _ngZone: NgZone,
    private titleService: Title) {
    this.applicationTitle = 'Web Automation Portal';

    if (Config.currentEnvironment) {
      this.currentEnvironment = ` (${Config.currentEnvironment})`;
      this.applicationTitle += ` - ${Config.currentEnvironment}`;
      this.applicationName = Config.applicationName;
    } else {
      this.currentEnvironment = null;
    }

    this.titleService.setTitle(this.applicationTitle);

    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
      this.oktaAuth.getUser().then(x => this.initApplication(x));
    });
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.getUser().then(x => this.initApplication(x));
  }

  initApplication(userClaims) {
    if (userClaims && userClaims.email) {
      this.username = userClaims.email.split('@')[0].toUpperCase();
      // if (userClaims.user && userClaims.user.entity) {
      //   const splitEntity: string = userClaims.user.entity.split(',');
      //   this.store.dispatch(new actions.SetEntityObjectAction({
      //     entityID: Number(splitEntity[1]),
      //     entityName: splitEntity[0]
      //   }));
      // }
    } else {
      this.username = null;
    }
  }

  menuClick() {
    this.onMenuClick.emit();
  }

  logout() {
    this.oktaAuth.logout().then(() => {
      console.log('Session is deleted');
      this.loginRedirect();
    })
      .catch(error => {
        console.log('Error occured while deleting session');
        this.loginRedirect();
      });
  }

  loginRedirect() {
    localStorage.clear();
    this.store.dispatch(new actions.FinishAjaxCall());
    this.router.navigate(['/login']);
  }
}
