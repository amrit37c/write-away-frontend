import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";

import { BlogsRoutingModule } from "./blogs-routing.module";
import { BlogsComponent } from "./blogs.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [BlogsComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
  ],
})
export class BlogsModule {}
