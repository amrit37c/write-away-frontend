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
    class: "modalWidth contact-us",
  };
  ModalFbconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modalWidth feedback",
  };
  ModalTmconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modalWidth test-mon",
  };
  review: string = "";
  testimonials: string = "";
  email: string = "";
  info: string = "";

  constructor(
    private modalService: BsModalService,
    private service: UserService
  ) {}

  ngOnInit() {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Modalconfig);
  }

  
  openFbModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.ModalFbconfig);
  }

  openTmModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.ModalTmconfig);
  }



  sendFeedBack() {
    this.service
      .sendFeedBack({
        email: this.email,
        feedback: this.review,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.decline();
      });
  }
  sendTestimonial() {
    this.service
      .sendTestimonial({
        email: this.email,
        testimonial: this.testimonials,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.decline();
      });
  }
  sendContactus() {
    this.service
      .sendTestimonial({
        email: this.email,
        info: this.info,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.decline();
      });
  }
  decline(): void {
    this.modalRef.hide();
    this.review = "";
    this.testimonials = "";
    this.info = "";
    this.email = "";
  }
}
