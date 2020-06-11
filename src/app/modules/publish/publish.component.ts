import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/service/blog/blog.service";
import { PublicationService } from "src/app/service/publications/publication.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-publish",
  templateUrl: "./publish.component.html",
  styleUrls: ["./publish.component.css"],
})
export class PublishComponent implements OnInit {
  url = environment.url;
  gridView: Boolean = true;

  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  publications: Array<any> = [];

  slidesChangeMessage = "";
  slides = [
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
  ];

  openPublicationGenresCount: number = 0;

  constructor(private service: PublicationService) {}

  ngOnInit() {
    this.getPubliactions(); // fetch publications
  }

  /**
   * // TODO: comment renderView
   * Conditional render list-grid view
   * @param type
   * @returns void
   */
  renderView(type: string) {
    type === "list" ? (this.gridView = false) : (this.gridView = true);
  }

  getPubliactions() {
    this.service.get().subscribe((_response) => {
      this.publications = _response.body.data;
      this.publications.forEach((el) => {
        this.openPublicationGenresCount += el.genres.length;
      });
    });
  }
  getBrief(content) {
    return content.substr(0, 500);
  }
}
