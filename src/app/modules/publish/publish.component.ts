import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-publish",
  templateUrl: "./publish.component.html",
  styleUrls: ["./publish.component.css"],
})
export class PublishComponent implements OnInit {
  gridView: Boolean = true;

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
  constructor() {}

  ngOnInit() {}

  /**
   * // TODO: comment renderView
   * Conditional render list-grid view
   * @param type
   * @returns void
   */
  renderView(type: string) {
    type === "list" ? (this.gridView = false) : (this.gridView = true);
  }
}
