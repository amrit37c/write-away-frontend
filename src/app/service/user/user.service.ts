import { Injectable, EventEmitter, Output } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { BaseService } from "../base.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService {
  baseUrl = environment.baseUrl;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(public http: HttpClient, public router: Router) {
    super(environment.baseUrl + environment.apis.user, http, router);
  }

  register(payload): Observable<any> {
    const url = `${this.baseUrl}${environment.apis.register}`;
    return this.http
      .post<any>(url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
  login(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.login}`;
    return this.http
      .post<any>(url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  sendEmail(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/${environment.apis.forgetEmail}`;
    return this.http
      .post<any>(url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
  reSendOTP(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/${environment.apis.resendOTP}`;
    return this.http
      .post<any>(url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  verifyOTP(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/${environment.apis.verifyOTP}`;
    return this.http
      .post<any>(url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
  verifySignupOTP(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/${environment.apis.verifySignUpOTP}`;
    return this.http
      .post<any>(url, payload, {
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  updatePassword(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/update-password`;
    return this.http
      .put<any>(`${url}`, payload, {
        headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
  sendFeedBack(payload): Observable<any> {
    const url = `${environment.baseUrl}${environment.apis.user}/${environment.apis.feedback}`;
    return this.http
      .post<any>(url, payload, {
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
}
