import { Injectable } from "@angular/core";
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
          return throwError(error);
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
}
