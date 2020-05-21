import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/service/blog/blog.service";
import { PublicationService } from "src/app/service/publications/publication.service";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;

  slidesChangeMessage = "";
  slides = [
    { image: "assets/images/2.jpg" },
    { image: "assets/images/6.jpg" },
    { image: "assets/images/04.jpg" },
    { image: "assets/images/06.jpg" },
    { image: "assets/images/04.jpg" },
  ];

  blogIndex: number = 0;
  publicationIndex: number = 0;
  openPublicationIndex: number = 0;
  closedPublicationIndex: number = 0;
  blogs: Array<any> = [];
  publications: Array<any> = [];
  openPublications: Array<any> = [];
  closedPublications: Array<any> = [];
  userId;

  constructor(
    private blogService: BlogService,
    private publicationService: PublicationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBlogs(); //get blogs
    this.getPublications(); //get blogs

    // check user is login
    const token = localStorage.getItem("token");
    const { id } = jwt_decode(token);
    if (id) {
      this.userId = id;
    }
  }
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }

  getBlogs() {
    this.blogService.get().subscribe((_response) => {
      this.blogs = _response.body.data;
    });
  }
  getPublications() {
    this.publicationService.get().subscribe((_response) => {
      this.publications = _response.body.data;

      this.openPublications = this.publications.filter(
        (el) => el.publicationStatus == 2
      );
      this.closedPublications = this.publications.filter(
        (el) => el.publicationStatus == 3
      );

      console.log("this", this.openPublications);
    });
  }

  blogPublishSlider(type: String) {
    if (type === "-") {
      if (this.blogIndex < 1) {
        this.blogIndex = this.blogs.length - 1;
      } else {
        this.blogIndex--;
      }
    } else {
      if (this.blogIndex == this.blogs.length - 1) {
        this.blogIndex = 0;
        return;
      } else {
        this.blogIndex++;
      }
    }
  }
  publishCationSlider(type: String, publication) {
    if (publication == "open") {
      if (type === "-") {
        if (this.openPublicationIndex < 1) {
          this.openPublicationIndex = this.openPublications.length - 1;
        } else {
          this.openPublicationIndex--;
        }
      } else {
        if (this.openPublicationIndex == this.openPublications.length - 1) {
          this.openPublicationIndex = 0;
          return;
        } else {
          this.openPublicationIndex++;
        }
      }
    } else {
      if (type === "-") {
        if (this.closedPublicationIndex < 1) {
          this.closedPublicationIndex = this.closedPublications.length - 1;
        } else {
          this.closedPublicationIndex--;
        }
      } else {
        if (this.closedPublicationIndex == this.closedPublications.length - 1) {
          this.closedPublicationIndex = 0;
          return;
        } else {
          this.closedPublicationIndex++;
        }
      }
    }
  }

  addToFollowing(id) {
    console.log("publication  id", this.userId);
    if (!this.userId) {
      this.openLogin();
    }
    this.publicationService
      .saveUserPublishing({
        publicationType: "bookmark",
        publicationId: id,
        publishedBy: this.userId,
      })
      .subscribe((_response) => {
        console.log(">>>>", _response);
      });
  }

  sharePublication(link) {
    if (!this.userId) {
      this.openLogin();
    }
  }
  writePublication(id) {
    if (!this.userId) {
      this.openLogin();
      return;
    }
    this.router.navigateByUrl(
      "/user-profile/write-publication/" +
        this.openPublications[this.openPublicationIndex]._id
    );
  }
  openLogin() {
    let element: HTMLElement = document.getElementsByClassName("btn_img")[0]
      .firstElementChild as HTMLElement;
    element.click();
    return;
  }
}
