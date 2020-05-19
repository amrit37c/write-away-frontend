import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-user-sidebar",
  templateUrl: "./user-sidebar.component.html",
  styleUrls: ["./user-sidebar.component.css"],
})
export class UserSidebarComponent implements OnInit {
  show: boolean = true;
  @Input() display;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.show = this.display;
  }
}
