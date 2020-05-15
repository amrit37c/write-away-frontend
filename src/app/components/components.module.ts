import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// custom modules
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";

// routing modules

// components
import { CarouselComponent } from "./carousel/carousel.component";
import { ModalComponent } from "./modal/modal.component";
import { EditorComponent } from "./editor/editor.component";

@NgModule({
  declarations: [CarouselComponent, ModalComponent, EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    CKEditorModule,
  ],
  exports: [CarouselComponent, ModalComponent, EditorComponent],
})
export class ComponentsModule {}
