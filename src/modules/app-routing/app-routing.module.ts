import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard, OktaLoginRedirectComponent } from '@okta/okta-angular';
import { PageRefreshGuard, CanDeactivateGuard } from '../../guards';
import * as constants from '../../constants/left-menu';
import {
  ErrorPageComponent,
  JudicatureComponent,
  HomeComponent
} from '../../components';

const routes: Routes = [
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'login', component: OktaLoginRedirectComponent },
  { path: constants.JUDICATURE_ROUTE, component: JudicatureComponent, canActivate: [OktaAuthGuard], data: { title: constants.JUDICATURE } },
  { path: constants.HOME, component: HomeComponent },
  { path: 'error-page', component: ErrorPageComponent, canActivate: [PageRefreshGuard] },
  {
    path: '',
    redirectTo: `/${constants.HOME}`,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: `/${constants.HOME}`
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
