import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { DecodedToken, TokenResponse } from '../models/auth.model';
import { User, ChangePassword } from '../models/auth.model';
import { ListsService } from './lists/lists.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user: UserWithProfile | null = null;
  // user$: BehaviorSubject<UserWithProfile | null> = new BehaviorSubject<UserWithProfile | null>(this.user);
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isAuthenticated
  );

  headerOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private listsService: ListsService
  ) {}

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  set accessToken(value: string | null) {
    localStorage.setItem('accessToken', value as string);
  }

  get isAuthenticated(): boolean {
    return Boolean(this.accessToken);
  }

  // Login service

  login(email: string, password: string): Observable<TokenResponse> {
    const url = environment.api + '/auth/login';
    const encoded: string = btoa(email + '|' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: encoded,
      }),
    };
    return this.http.get<TokenResponse>(url, httpOptions).pipe(
      tap((res) => {
        if (res.status === 'valid') this.authenticateUser(res.token);
      })
    );
  }

  // Logout service

  logout(): void {
    this.accessToken = '';
    this.isAuthenticated$.next(this.isAuthenticated);
    this.router.navigate(['/login']);
  }

  // Create Account Service

  sendCreateAccountFormData(user: User): Observable<User> {
    const url = environment.api + '/users';
    return this.http.post<User>(url, JSON.stringify(user), this.headerOptions);
  }

  codeCheckWithEmail(email: string, code: string): Observable<string> {
    const url = environment.api + '/auth/token-check/';
    return this.http.get<string>(url + email + '/' + code);
  }

  checkCreateAccountValidate(token: string): Observable<boolean> {
    const url = environment.api + '/auth/validate-account';
    return this.http.put<boolean>(
      url,
      JSON.stringify(token),
      this.headerOptions
    );
  }

  sendCreateAccountCode(email: string): Observable<string> {
    const url = environment.api + '/auth/new-account-code/';
    return this.http.get<string>(url + email);
  }

  // Forgot Password Service

  sendForgotPasswordCode(email: string): Observable<string> {
    const url = environment.api + '/auth/forgot-password/';
    return this.http.get<string>(url + email);
  }

  // Change Password Service

  checkToken(token: string): Observable<boolean> {
    const url = environment.api + '/auth/token-check/';
    return this.http.get<boolean>(url + token);
  }

  updatePassword(params: ChangePassword): Observable<string> {
    const url = environment.api + '/auth/change-password';
    // update password. return email to be used for login
    return this.http.put<string>(
      url,
      JSON.stringify(params),
      this.headerOptions
    );
  }

  // ReCAPTCHA Service

  recaptchaValidate(token: string): Observable<{}> {
    const url = environment.api + '/validate_captcha';
    return this.http.post<string>(
      url,
      JSON.stringify(token),
      this.headerOptions
    );
  }

  // Checking authentication service

  isTokenExpired(token: string | null): boolean {
    if (!token) token = this.accessToken;
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  authenticateUser(accessToken: string | null) {
    this.accessToken = accessToken;
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<DecodedToken>(token);

    if (decoded.exp === undefined) return new Date();
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
}
