import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, BehaviorSubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:3030/api/user';

  loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  register(user) {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  login(user) {
    console.log('service url =', `${this.url}/login/`);
    return this.http
      .post<any>(`${this.url}/login/`, user)
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userdetails');
    this.router.navigate(['/user/login']);
  }

  loggedIn() {
    this.loginStatus.next(true);
    return !!localStorage.getItem('token');
  }

  // send user email id and password
  getUserDetails(user) {
    return this.http
      .post<any>(`${this.url}/getUserDetails/`, user)
      .pipe(catchError(this.handleError));
  }
}
