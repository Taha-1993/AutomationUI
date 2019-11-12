import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable, empty, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private oktaAuth: OktaAuthService, private readonly injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.isAuthenticated().pipe(
      mergeMap(isAuthenticated => {
        if (!isAuthenticated) {
          const router = this.injector.get(Router);
          router.navigate(['/login']);
          return empty();
        }

        return this.getAccessToken().pipe(
          mergeMap(accessToken => {
            request = request.clone({
              setHeaders: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
              }
            });

            return next.handle(request);
          }));
      }));
  }

  private isAuthenticated(): Observable<boolean> {
    return from(this.oktaAuth.isAuthenticated());
  }

  private getAccessToken(): Observable<string> {
    return from(this.oktaAuth.getAccessToken());
  }
}
