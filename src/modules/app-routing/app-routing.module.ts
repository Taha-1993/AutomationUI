import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard, OktaLoginRedirectComponent } from '@okta/okta-angular';
import { PageRefreshGuard, CanDeactivateGuard } from '../../guards';
import * as constants from '../../constants/left-menu';
import {
  ErrorPageComponent,
  TestCaseExecutionComponent
} from '../../components';

const routes: Routes = [
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'login', component: OktaLoginRedirectComponent },
  { path: constants.TEST_CASE_EXECUTION_ROUTE, component: TestCaseExecutionComponent, canActivate: [OktaAuthGuard], data: { title: constants.TEST_CASE_EXECUTION } },
  { path: 'error-page', component: ErrorPageComponent, canActivate: [PageRefreshGuard] },
  {
    path: '',
    redirectTo: `/${constants.TEST_CASE_EXECUTION_ROUTE}`,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: `/${constants.TEST_CASE_EXECUTION_ROUTE}`
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
