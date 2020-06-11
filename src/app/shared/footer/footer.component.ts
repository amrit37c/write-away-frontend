import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UserService } from "src/app/service/user/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  modalRef: BsModalRef;
  Modalconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  review: string = "";
  email: string = "";

  constructor(
    private modalService: BsModalService,
    private service: UserService
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Modalconfig);
  }

  sendFeedBack() {
    this.service
      .sendFeedBack({
        email: this.email,
        feedback: this.review,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
      });
  }
  decline(): void {
    this.modalRef.hide();
    this.review = "";
    this.email = "";
  }
}
