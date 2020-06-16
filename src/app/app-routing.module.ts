import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/login/login.component";
import { SignupComponent } from "./modules/signup/signup.component";
import { ForgetPassComponent } from "./modules/forget-pass/forget-pass.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "forget-pass", component: ForgetPassComponent },
  {
    path: "home",
    loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "publish",
    loadChildren: () => import("./modules/publish/publish.module").then((m) => m.PublishModule),
  },
  {
    path: "blogs",
    loadChildren: () => import("./modules/blogs/blogs.module").then((m) => m.BlogsModule),
  },
  {
    path: "user-profile",
    loadChildren: () => import("./modules/user-profile/user-profile.module").then((m) => m.UserProfileModule),
  },
  {
    path: "reading-room", loadChildren: () => import('./reading-room/reading-room.module').then((m) => m.ReadingRoomModule)
  }
  // { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
