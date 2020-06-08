import { Component, OnInit, TemplateRef } from "@angular/core";
import { BlogService } from "src/app/service/blog/blog.service";
import { PublicationService } from "src/app/service/publications/publication.service";
import * as jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

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
  modalRef: BsModalRef;
  blogOpenId;
  Modalconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  copiedLink: string = "";

  constructor(
    private blogService: BlogService,
    private publicationService: PublicationService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getBlogs(); //get blogs
    this.getPublications(); //get publication

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
    this.blogService.get({ activeBlog: true }).subscribe((_response) => {
      this.blogs = _response.body.data;
    });
  }
  getPublications() {
    this.publicationService
      .get({ isPublished: false })
      .subscribe((_response) => {
        this.publications = _response.body.data;

        this.openPublications = this.publications.filter(
          (el) => el.publicationStatus == 2
        );
        this.closedPublications = this.publications.filter(
          (el) => el.publicationStatus == 3
        );
      });
  }

  blogPublishSlider(type: String, blog) {
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

  // unused
  addToFollowing(id) {
    if (!this.userId) {
      this.openLogin();
    }
    // this.publicationService
    //   .saveUserPublishing({
    //     publicationType: "bookmark",
    //     publicationId: id,
    //     publishedBy: this.userId,
    //   })
    //   .subscribe((_response) => {});
  }

  sharePublication(link) {
    var text = "http://demo.writeawayy.com/publication-read/" + link._id;
    navigator.clipboard.writeText(text).then(
      function () {
        alert("Link copied to clipboard");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
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
  readBlog(id) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.blogService.updateRead(id, {}).subscribe((_respone) => {});
    this.router.navigateByUrl("/blogs");
    // routerLink="/blogs/{{blogs[0]._id}}"
  }
  openLogin() {
    let element: HTMLElement = document.getElementsByClassName("btn_img")[0]
      .firstElementChild as HTMLElement;
    element.click();
    return;
  }

  blogBookMarkStatus() {
    return this.blogs.length &&
      this.blogs[0].bookmark &&
      this.blogs[0].bookmark.bookMarkStatus === "1"
      ? " fa-bookmark"
      : "fa-bookmark-o";
  }

  blogLikeStatus() {
    return this.blogs.length &&
      this.blogs[0].like &&
      this.blogs[0].like.likeStatus === "1"
      ? "fa-heart"
      : "fa-heart-o";
  }

  publicationBookMarkStatus(publication) {
    return publication &&
      publication.bookmark &&
      publication.bookmark.bookMarkStatus === "1"
      ? " fa-bookmark"
      : "fa-bookmark-o";
  }

  saveBlogBookMark(blog) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.blogService
      .postBookMark({
        bookMarkStatus: 1,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogs();
      });
  }

  updateBlogBookMark(blog) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.blogService
      .putBookMark(blog.bookmark._id, {
        bookMarkStatus: blog.bookmark.bookMarkStatus === "0" ? 1 : 0,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogs();
      });
  }

  savePublicationBookMark(publication) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.publicationService
      .postBookMark({
        bookMarkStatus: 1,
        publicationId: publication._id,
      })
      .subscribe((_response) => {
        this.getPublications();
      });
  }

  updatePublicationBookMark(publication) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.publicationService
      .putBookMark(publication.bookmark._id, {
        bookMarkStatus: publication.bookmark.bookMarkStatus === "0" ? 1 : 0,
        publicationId: publication._id,
      })
      .subscribe((_response) => {
        this.getPublications();
      });
  }

  saveBlogLike(blog) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.blogService
      .postLike({
        likeStatus: 1,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogs();
      });
  }

  updateBlogLike(blog) {
    if (!this.userId) {
      this.openLogin();
      return;
    }

    this.blogService
      .putLike(blog.like._id, {
        likeStatus: blog.like.likeStatus === "0" ? 1 : 0,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogs();
      });
  }

  blogShareLink(platform, id?) {
    // this.modalRef = this.modalService.show(template);
    id = id ? id : this.blogOpenId;
    this.copiedLink = "http://demo.writeawayy.com/blogs/" + id;
    console.log("copied", this.copiedLink);
    navigator.clipboard.writeText(this.copiedLink).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
        alert("Link copied to clipboard");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
    // this.decline();

    this.blogService
      .updateShare(id, { platform: platform })
      .subscribe((_respone) => {});
    // this.router.navigateByUrl("/blogs/" + id);
  }

  copyBlogLink(id?) {
    id = id ? id : this.blogOpenId;
    this.copiedLink = "http://demo.writeawayy.com/blogs/" + id;
  }

  openShareModal(template: TemplateRef<any>, id) {
    if (!this.userId) {
      this.openLogin();
      return;
    }
    this.blogOpenId = id;
    this.copyBlogLink(id);
    this.modalRef = this.modalService.show(template);
  }

  decline(): void {
    this.modalRef.hide();
    this.blogOpenId = "";
    this.copiedLink = "";
  }
  getBrief() {
    return this.openPublications[this.openPublicationIndex].brief.substr(
      0,
      500
    );
  }
  getBlogContent(content) {
    return content.substr(0, 1750);
  }
}
