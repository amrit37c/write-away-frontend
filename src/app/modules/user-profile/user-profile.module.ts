import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { UserSidebarComponent } from "./user-sidebar/user-sidebar.component";
import { MyReadingComponent } from "./my-reading/my-reading.component";
import { MyBookmarksComponent } from "./my-bookmarks/my-bookmarks.component";
import { MySubmissionsComponent } from "./my-submissions/my-submissions.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WritePublicationComponent } from "./write-publication/write-publication.component";
import { ComponentsModule } from "src/app/components/components.module";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { MyDeskComponent } from './my-desk/my-desk.component';
import { ReadPublicationComponent } from './read-publication/read-publication.component';

@NgModule({
  declarations: [
    UserSidebarComponent,
    MyReadingComponent,
    MyBookmarksComponent,
    MySubmissionsComponent,
    MyProfileComponent,
    WritePublicationComponent,
    MyDeskComponent,
    ReadPublicationComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
})
export class UserProfileModule {}
