import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

// custom modules
import { ModalModule } from "ngx-bootstrap/modal";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// import { ShareButtonsConfig } from "ngx-sharebuttons";
// import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
// import { ShareModule } from "ngx-sharebuttons";
// routing modules

// components

// const customConfig: ShareButtonsConfig = {
//   include: ["facebook", "twitter", "google"],
//   exclude: ["tumblr", "stumble", "vk"],
//   theme: "modern-light",
//   gaTracking: true,
//   twitterAccount: "twitterUsername",
// };

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // ShareButtonsModule.withConfig(customConfig),
    // ShareModule,
  ],
})
export class HomeModule {}
