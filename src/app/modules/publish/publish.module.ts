import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// custom modules
import { ComponentsModule } from "src/app/components/components.module";
import { CarouselModule } from "ngx-bootstrap/carousel";
// routing modules
import { PublishRoutingModule } from "./publish-routing.module";

// components
import { PublishComponent } from "./publish.component";

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    PublishRoutingModule,
    ComponentsModule,
    CarouselModule.forRoot(),
  ],
})
export class PublishModule {}
