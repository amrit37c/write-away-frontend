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
  constructor(public http: HttpClient, public router: Router) {
    super(environment.baseUrl + environment.apis.publications, http, router);
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
        // headers: this.token(),
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
