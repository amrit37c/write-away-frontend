import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyReadingComponent } from "./my-reading/my-reading.component";
import { MyBookmarksComponent } from "./my-bookmarks/my-bookmarks.component";
import { MySubmissionsComponent } from "./my-submissions/my-submissions.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { WritePublicationComponent } from "./write-publication/write-publication.component";
import { MyDeskComponent } from "./my-desk/my-desk.component";
import { ReadPublicationComponent } from "./read-publication/read-publication.component";

const routes: Routes = [
  { path: "my-reading", component: MyReadingComponent },
  { path: "my-bookmarks", component: MyBookmarksComponent },
  { path: "my-submissions", component: MySubmissionsComponent },
  { path: "edit-profile", component: MyProfileComponent },
  { path: "write-publication", component: WritePublicationComponent },
  { path: "write-publication/:id", component: WritePublicationComponent },
  { path: "read-publication", component: ReadPublicationComponent },
  { path: "read-publication/:id", component: ReadPublicationComponent },
  { path: "my-desk", component: MyDeskComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
