import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// custom modules
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";

// routing modules

// components
import { CarouselComponent } from "./carousel/carousel.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
  declarations: [CarouselComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [CarouselComponent, ModalComponent],
})
export class ComponentsModule {}
