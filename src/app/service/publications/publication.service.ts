import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BaseService } from "../base.service";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PublicationService extends BaseService {
  baseUrl = `${environment.baseUrl}${environment.apis.publications}`;
  constructor(public http: HttpClient, public router: Router) {
    super(environment.baseUrl + environment.apis.publications, http, router);
  }

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
  getOne(id?: string, json?: Object): Observable<any> {
    let httpParams;
    if (json) {
      httpParams = new HttpParams().set(
        Object.keys(json)[0],
        Object.values(json)[0]
      );
    }

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

  /***
   * GET All record from the server
   **/

  getUserPublication(json?: Object, page?, sort?): Observable<any> {
    let httpParams;
    if (json) {
      httpParams = new HttpParams().set(
        Object.keys(json)[0],
        Object.values(json)[0]
      );
    }
    const url = environment.baseUrl + environment.apis.userPublication;

    return this.http
      .get<any>(url, {
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

  /*** Post to the server **/
  saveUserPublishing(payload): Observable<any> {
    const url = environment.baseUrl + environment.apis.userPublication;

    return this.http
      .post<any>(url, payload, {
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
  updateUserPublishing(id, payload): Observable<any> {
    const url = environment.baseUrl + environment.apis.userPublication;
    return this.http
      .put<any>(`${url}/${id}`, payload, {
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

  /*** Post to the server **/
  postBookMark(payload): Observable<any> {
    return this.http
      .post<any>(
        `${this.url}/${environment.apis.publicationBookMark}`,
        payload,
        {
          headers: this.token(),
          responseType: "json",
          observe: "response",
        }
      )
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
  putBookMark(id, payload): Observable<any> {
    return this.http
      .put<any>(
        `${this.url}/${environment.apis.publicationBookMark}/${id}`,
        payload,
        {
          headers: this.token(),
          responseType: "json",
          observe: "response",
        }
      )
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
