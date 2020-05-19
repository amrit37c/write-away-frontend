import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-read-publication",
  templateUrl: "./read-publication.component.html",
  styleUrls: ["./read-publication.component.css"],
})
export class ReadPublicationComponent implements OnInit {
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;

  slidesChangeMessage = "";
  slides = [
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
  ];

  editorData = "<p>HIIIII</p>";
  topic: string = "";
  mediaAvailable = []; // available genres select by user
  id;
  showGenres: boolean = true;
  data: Array<any> = [];

  modalRef: BsModalRef;
  Modelconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  constructor() {}

  ngOnInit() {}
}
