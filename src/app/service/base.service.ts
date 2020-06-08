import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

export class BaseService {
  url: string;
  router: Router;
  AuthToken;
  type: string;

  constructor(apiUrl, public http: HttpClient, router) {
    this.url = apiUrl;
    this.router = router;
  }

  /***
   * GET All record from the server
   **/

  get(json?: Object, page?, sort?): Observable<any> {
    // const queryStrings = { size: environment.ItemperPage, page };
    // let httpParams = new HttpParams()
    //   .set("size", environment.ItemperPage)
    //   .set("page", page);
    let httpParams;
    if (json) {
      httpParams = new HttpParams().set(
        Object.keys(json)[0],
        Object.values(json)[0]
      );
    }
    return this.http
      .get<any>(this.url, {
        headers: this.token(),
        params: httpParams,
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

  /*** GET One record from the server **/
  getOne(id?: string): Observable<any> {
    return this.http
      .get<any>(id ? `${this.url}/${id}` : `${this.url}`, {
        headers: this.token(),
        observe: "response",
        responseType: "json",
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
  /*** Post to the server **/
  post(payload): Observable<any> {
    return this.http
      .post<any>(this.url, payload, {
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

  /*** delete from the server **/
  delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}`, {
        headers: this.token(),
        responseType: "json",
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

  /*** put on the server **/
  put(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${id}`, payload, {
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
  /*** put on the server **/
  patch(id, payload): Observable<any> {
    return this.http
      .patch<any>(`${this.url}/${id}`, payload, {
        headers: this.token(),
        responseType: "json",
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

  // handle error
  handleError(err) {
    let message;

    if (err.status === 401) {
      message = err.error.message;
      alert(message);
      this.router.navigateByUrl("/home");
    } else if (err.status === 500) {
      return throwError(err);
    } else if (err.status === 403) {
      message = err.error.body.error.description;
      return throwError(err);
    } else if (err.status === 409) {
      message = err.error.body.error.description;
      return throwError(err);
    } else if (err.status === 301) {
      message = err.error.body.error.description;
      return throwError(err);
    } else if (err.status === 400) {
      message = err.error.message;
      alert(message);
      return throwError(err);
    } else if (err.status === 404) {
      message = err.error.message;
      return throwError(err);
    } else if (err.status === 0) {
      message = "You are offline";
      return throwError(err);
    } else if (err.error.body.error.code === "305") {
      message = err.error.body.error.description;
      return throwError(err);
    } else {
      return throwError(err);
    }
  }

  token() {
    let token = localStorage.getItem("token");
    // create authorization header with jwt token
    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      return headers;
    } else {
      return new HttpHeaders();
    }
  }
}
