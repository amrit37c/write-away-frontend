import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/service/blog/blog.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
  id;
  blog;
  recentBlogs: Array<any> = [];
  recentBlog = {};
  archievedBlogs: Array<any> = [];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  blogOpenId;

  monthsArchievedData = {};
  objectKeys = Object.keys;
  archieveMonthArr = [];
  modalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private service: BlogService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((_response) => {
      this.id = _response.id;
      this.getBlogDetails(this.id);
      this.getBlogs("recent", { isPublished: "today", activeBlog: "false" });
      // this.getBlogs("archieved", { isPublished: "yesterday" });
    });
  }

  getBlogDetails(id) {
    this.service.getOneBlog(this.id || id).subscribe((_response) => {
      this.blog = _response.body.data;
    });
  }

  getBlogs(type, filter) {
    console.log("types", filter);
    this.service.get(filter).subscribe((_response) => {
      const { data } = _response.body;

      const filter = data.filter((el) => el._id != this.id);

      this.archievedBlogs = [];
      const allBlogs = [].concat(filter);
      this.archievedBlogs = [].concat(filter);
      this.recentBlogs = allBlogs.slice(0, 2);

      // this.recentBlogs = _response.body.data;
      console.log(">>>RECENT>", this.recentBlog);
      console.log(">>>ARchiev BEFORE>", this.archievedBlogs);
      console.log(">>>ARchiev After>", this.archievedBlogs);
      this.archievedBlogs.splice(0, 2);
      // console.log('>>>RECENT>', this.recentBlog);
      // if (type == "recent") {

      //   this.recentBlogs = [];
      //   this.recentBlogs = _response.body.data;
      //   this.recentBlogs = this.recentBlogs.splice(0, 2);
      // } else {
      //   this.archievedBlogs = [];
      //   this.archievedBlogs = _response.body.data;
      // }
      // if (!this.recentBlogs.length) {
      //   this.recentBlogs = this.archievedBlogs.splice(0, 2);
      // }

      this.archievedBlogs.forEach((el) => {
        var dt =
          this.months[new Date(el.createdAt).getMonth()] +
          "-" +
          new Date(el.createdAt).getFullYear();

        if (this.monthsArchievedData[dt]) {
          this.monthsArchievedData[dt].push(el);
        } else {
          this.monthsArchievedData[dt] = [el];
        }
      });
    });
  }

  addToRecent(id) {
    const blog = this.recentBlogs.filter((blog) => blog._id == id);
    this.recentBlog = blog[0];
  }

  archieveBlogShow(blogs: []) {
    this.archieveMonthArr = [];
    this.archieveMonthArr = blogs;
  }

  saveBlogLike(blog) {
    this.service
      .postLike({
        likeStatus: 1,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogDetails(this.id);
        this.getBlogs("recent", { isPublished: "today" });
        this.getBlogs("archieved", { isPublished: "yesterday" });
      });
  }

  updateBlogLike(blog) {
    this.service
      .putLike(blog.like._id, {
        likeStatus: blog.like.likeStatus === "0" ? 1 : 0,
        blogId: blog._id,
      })
      .subscribe((_response) => {
        this.getBlogDetails(this.id);
        this.getBlogs("recent", { isPublished: "today" });
        this.getBlogs("archieved", { isPublished: "yesterday" });
      });
  }

  blogShareLink(id?) {
    id = id ? id : this.id;
    var text = "http://demo.writeawayy.com/blogs/" + id;
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
        alert("Link copied to clipboard");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );

    this.service.updateShare(id, {}).subscribe((_respone) => {});
    // this.router.navigateByUrl("/blogs/" + id);
  }
  openShareModal(template: TemplateRef<any>, id) {
    this.blogOpenId = id;
    this.modalRef = this.modalService.show(template);
  }
}
