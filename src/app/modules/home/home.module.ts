import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

// custom modules
import { ModalModule } from "ngx-bootstrap/modal";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
// import { ShareIconsModule } from "ngx-sharebuttons/icons";

import { ShareButtonsModule } from "ngx-sharebuttons/buttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";
import { ShareModule } from "ngx-sharebuttons";

import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import { Platform } from "@angular/cdk/platform";

const icons = [
  // ... other icons
  faFacebookSquare,
];

const shareProp = {
  facebook: {
    icon: ["fab", "facebook-square"],
  },
};

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ShareButtonsModule,
    // ShareButtonsModule.withConfig({ prop: shareProp }),
    // .withConfig({
    //   debug: true,
    // }),
    ShareIconsModule,
    // ShareModule,
  ],
})
export class HomeModule {
  // constructor(iconLibrary: FaIconLibrary) {
  //   iconLibrary.addIcons(...icons);
  // }
}
