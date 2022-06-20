import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { DecodedToken, TokenResponse, UserWithProfile } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: UserWithProfile | null = null;
  user$: BehaviorSubject<UserWithProfile | null> = new BehaviorSubject<UserWithProfile | null>(this.user);
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  set accessToken(value: string | null) {
    localStorage.setItem('accessToken', value as string);
  }

  get isAuthenticated(): boolean {
    return Boolean(this.accessToken);
  }

  login(email: string, password: string): Observable<TokenResponse> {
    const url = environment.api + '/auth/login';
    const encoded: string = btoa(email + "|" + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': encoded
      })
    };
    return this.http.get<TokenResponse>(url, httpOptions).pipe(
      tap(res => { if (typeof res === "string") this.authenticateUser(res) })
    );
  }

  logout(): void {
    this.accessToken = '';
    this.isAuthenticated$.next(this.isAuthenticated);
    this.router.navigate(['/login']);
  }

  // getAuth(): Observable<UserWithProfile> {
  //   const url = environment.api + '/auth';
  //   return this.http.get<UserWithProfile>(url).pipe(
  //     tap(user => {
  //       this.user = user;
  //       this.user$.next(this.user);
  //     })
  //   );
  // }

  isTokenExpired(token: string | null): boolean {
    if (!token) token = this.accessToken;
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<DecodedToken>(token);
    if (decoded.exp === undefined) return new Date();
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  authenticateUser(accessToken: string | null) {
    this.accessToken = accessToken;
    // localStorage.setItem('accessToken', this.accessToken);
    // this.isAuthenticated$.next(this.isAuthenticated);
    // this.getAuth().subscribe();
  }

  // getUpdateInfoCode(email: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth/update-user-verification/add';
  //   return this.http.post<SuccessResponse>(url, { email });
  // }

  // updateUser(email: string, walletAddress: string, password: string, code: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth';
  //   return this.http.put<SuccessResponse>(url, { email, walletAddress, password, code });
  // }

  // upgrade(transactionHash: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/level/up';
  //   return this.http.post<SuccessResponse>(url, { transactionHash });
  // }

  // getForgotPasswordCode(email: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth/forgot-password-verification/add';
  //   return this.http.post<SuccessResponse>(url, { email });
  // }

  // resetPassword(email: string, password: string, code: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth/forgot-password';
  //   return this.http.post<SuccessResponse>(url, { email, password, code });
  // }

  // signup(firstName: string, lastName: string, email: string, password: string, invitee: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth/signup';
  //   return this.http.post<SuccessResponse>(url, { firstName, lastName, email, password, invitee });
  // }

  // acceptInvite(firstName: string, lastName: string, email: string, password: string, invitorId: string): Observable<SuccessResponse> {
  //   const url = environment.api + '/auth/accept-invite/' + invitorId;
  //   return this.http.post<SuccessResponse>(url, { firstName, lastName, email, password });
  // }
}
