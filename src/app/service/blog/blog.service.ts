import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BaseService } from "../base.service";

@Injectable({
  providedIn: "root",
})
export class BlogService extends BaseService {
  baseUrl = `${environment.baseUrl}${environment.apis.blogs}`;

  constructor(public http: HttpClient, public router: Router) {
    super(environment.baseUrl + environment.apis.blogs, http, router);
  }
}
