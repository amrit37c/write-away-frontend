import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/service/blog/blog.service";

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
  blogs: Array<any> = [];

  slidesChangeMessage = "";
  slides = [
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
  ];
  constructor(private service: BlogService) {}

  ngOnInit() {
    this.getBlogs(); // fetch blogs
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

  getBlogs() {
    this.service.get().subscribe((_response) => {
      this.blogs = _response.body.data;
    });
  }
  getBrief(content) {
    return content.substr(0, 500);
  }
}
