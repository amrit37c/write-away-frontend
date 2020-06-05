import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";

import { BlogsRoutingModule } from "./blogs-routing.module";
import { BlogsComponent } from "./blogs.component";

@NgModule({
  declarations: [BlogsComponent],
  imports: [CommonModule, BlogsRoutingModule, ModalModule.forRoot()],
})
export class BlogsModule {}
