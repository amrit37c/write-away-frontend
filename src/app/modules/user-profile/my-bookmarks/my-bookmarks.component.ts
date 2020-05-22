import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-bookmarks",
  templateUrl: "./my-bookmarks.component.html",
  styleUrls: ["./my-bookmarks.component.css"],
})
export class MyBookmarksComponent implements OnInit {
  count: number = 0;
  constructor() {}

  ngOnInit() {}
}
