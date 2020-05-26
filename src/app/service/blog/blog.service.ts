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
export class BlogService extends BaseService {
  baseUrl = `${environment.baseUrl}${environment.apis.blogs}`;

  constructor(public http: HttpClient, public router: Router) {
    super(environment.baseUrl + environment.apis.blogs, http, router);
  }

  get(json?: Object, page?, sort?): Observable<any> {
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
  getOneBlog(id?: string): Observable<any> {
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

  /*** Post BookMark to the server **/
  postBookMark(payload): Observable<any> {
    return this.http
      .post<any>(`${this.url}/${environment.apis.blogBookMark}`, payload, {
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

  /*** put Bookmark on the server **/
  putBookMark(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${environment.apis.blogBookMark}/${id}`, payload, {
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

  /*** Post BookMark to the server **/
  postLike(payload): Observable<any> {
    return this.http
      .post<any>(`${this.url}/${environment.apis.blogLike}`, payload, {
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

  /*** put Bookmark on the server **/
  putLike(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${environment.apis.blogLike}/${id}`, payload, {
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
}
