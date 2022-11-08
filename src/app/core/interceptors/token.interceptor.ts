import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authService.isTokenExpired(null)) {
      const duplicate = request.clone({
        headers: request.headers.set(
          'Authorization',
          this.authService.accessToken
            ? 'bearer ' + this.authService.accessToken
            : 'bearer'
        ),
      });

      return next.handle(duplicate).pipe(
        catchError((err) => {
          if (err.status === 401 || err.status === 403) {
            this.authService.logout();
          }
          return throwError(() => err);
        })
      );
    }

    if (
      !(
        request.url.includes('signup') ||
        request.url.includes('forgot-password') ||
        request.url.includes('validate_captcha') ||
        request.url.includes('token-check') ||
        request.url.includes('validate-account') ||
        request.url.includes('new-account-code') ||
        request.url.includes('change-password')
      )
    ) {
      this.authService.logout();
    }

    return next.handle(request);
  }
}
