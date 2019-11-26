import { BrowserModule, Title } from '@angular/platform-browser';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';
import { NgModule, ErrorHandler, APP_INITIALIZER, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../modules/app-routing/app-routing.module';
// import { ActionCellRenderComponent } from '../components/common/action-cellrender.component';
import { AgGridMaterialSelectEditorComponent } from '../components/common/ag-grid-material-select-editor/ag-grid-material-select-editor.component';
import { AGGridMaterialCheckboxEditorComponent } from '../components/common/ag-grid-material-checkbox-editor/ag-grid-material-checkbox-editor.component';
import { LicenseManager } from 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { AppMaterialModule } from '../modules/app-material/app-material.module';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer, metaReducers } from '../ngrx-store/reducers';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingOverlayPipe, SafeHTMLPipe, SafePipe } from '../pipes';
import { CustomErrorHandler } from '../handlers/error.handler';
import { CustomHttpInterceptor } from '../interceptors/http.interceptor';
import {
  PageRefreshGuard,
  CanDeactivateGuard
} from '../guards';
import {
  ErrorPageComponent,
  MatDialogComponent,
  TestCaseExecutionComponent,
  TestCaseConsolidatedResultsComponent,
  TestCaseHistoricalResultsComponent,
  TestScenarioExecutionResultsDialogComponent
} from '../components';
import {
  AppLoadService,
  MatDialogService,
  ExecutionService
} from '../services';
import {
  TestCaseExecutionEffects
} from '../ngrx-store/effects';
import { KeyValuePipe } from '../pipes/object-keys.pipe';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ActionCellRenderComponent } from '../components/common/action-cellrender.component';

LicenseManager.setLicenseKey(
  'Evaluation_License_Valid_Until__27_October_2018__MTU0MDU5NDgwMDAwMA==d47615e03f843a16f65fc1bbf9c7cb53'
);

export function get_settings(appLoadService: AppLoadService) {
  return () => appLoadService.getSettings();
}

@NgModule({
  declarations: [
    SafeHTMLPipe,
    SafePipe,
    LoadingOverlayPipe,
    MatDialogComponent,
    AgGridMaterialSelectEditorComponent,
    AGGridMaterialCheckboxEditorComponent,
    KeyValuePipe,
    ErrorPageComponent,
    AppComponent,
    ActionCellRenderComponent,
    HeaderComponent,
    TestCaseExecutionComponent,
    TestCaseConsolidatedResultsComponent,
    TestCaseHistoricalResultsComponent,
    TestScenarioExecutionResultsDialogComponent
  ],
  imports: [
    BrowserModule,
    // AppLoadModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    OktaAuthModule,
    ReactiveFormsModule,
    AngularResizedEventModule,
    StoreModule.forRoot({ reducer }, { metaReducers }),
    EffectsModule.forRoot([
      TestCaseExecutionEffects
    ]),
    AgGridModule.withComponents([
      ActionCellRenderComponent,
      AgGridMaterialSelectEditorComponent,
      AGGridMaterialCheckboxEditorComponent
    ])
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: get_settings, deps: [AppLoadService], multi: true },
    ExecutionService,
    {
      provide: OKTA_CONFIG,
      useFactory: (configService: AppLoadService) => {
        const oktaConfig = configService.getConfig();
        console.log('oktaConfig', oktaConfig);
        return oktaConfig;
      },
      deps: [AppLoadService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      deps: [OktaAuthService, Injector],
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
    { provide: APP_BASE_HREF, useValue: '/QAAutomation/' },
    OktaAuthService,
    OktaAuthGuard,
    Title,
    PageRefreshGuard,
    CanDeactivateGuard,
    AppLoadService,
    MatDialogService,
    KeyValuePipe
  ],
  entryComponents: [
    ActionCellRenderComponent,
    AgGridMaterialSelectEditorComponent,
    AGGridMaterialCheckboxEditorComponent,
    MatDialogComponent,
    TestScenarioExecutionResultsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
