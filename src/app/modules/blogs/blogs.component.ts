import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "src/app/service/blog/blog.service";

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

  constructor(private route: ActivatedRoute, private service: BlogService) {}

  ngOnInit() {
    this.route.params.subscribe((_response) => {
      this.id = _response.id;
      this.getBlogDetails(this.id);
      this.getBlogs("recent", { isPublished: "today" });
      this.getBlogs("archieved", { isPublished: "yesterday" });
    });
  }

  getBlogDetails(id) {
    this.service.getOne(this.id || id).subscribe((_response) => {
      this.blog = _response.body.data[0];
    });
  }

  getBlogs(type, filter) {
    // httpParams = new HttpParams().set("isPublished", "today");
    this.service.get(filter).subscribe((_response) => {
      if (type == "recent") {
        this.recentBlogs = _response.body.data;
      } else {
        const data = _response.body.data;
      }
    });
  }

  addToRecent(id) {
    const blog = this.recentBlogs.filter((blog) => blog._id == id);
    this.recentBlog = blog[0];
  }
}
