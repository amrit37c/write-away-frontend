import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PublicationService } from "src/app/service/publications/publication.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-write-publication",
  templateUrl: "./write-publication.component.html",
  styleUrls: ["./write-publication.component.css"],
})
export class WritePublicationComponent implements OnInit {
  itemsPerSlide = 3;
  singleSlideOffset = false;
  noWrap = false;
  count: number = 0;

  slidesChangeMessage = "";
  slides = [
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
    { image: "assets/images/write.svg" },
  ];

  editorData = "<p></p>";
  topic: string = "";
  mediaAvailable = []; // available genres select by user
  id; // publication id
  submissionId; // publication id
  userId;
  showGenres: boolean = true;
  data: Array<any> = [];
  suggestedPublication: Array<any> = [];
  followingPublication: Array<any> = [];
  writingPublication: Array<any> = [];

  modalRef: BsModalRef;
  Modelconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  submissionForm: FormGroup;
  editAble: boolean = false;

  constructor(
    private service: PublicationService,
    private activateRouter: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activateRouter.snapshot.paramMap.get("id");
    // check user is login
    const token = localStorage.getItem("token");
    const { id } = jwt_decode(token);
    if (id) {
      this.userId = id;
    }
    if (this.id) {
      this.getPublication(this.id); //get single publication
      this.getAllPublication(); // get suggested Publication
    }

    this.submissionForm = this.formBuilder.group({
      topic: [""],
      content: [""],
      mediaAvailable: [""],
    });
  }

  getContent(event) {
    this.editorData = event;
  }

  getPublication(id) {
    this.service.getOne(id).subscribe((_response) => {
      this.data = _response.body.data[0];
      if (this.data["userPublication"].length) {
        this.editAble = true;
        this.submissionId = this.data["userPublication"][0]["_id"];
        this.submissionForm.patchValue(this.data["userPublication"][0]);
        this.mediaAvailable = this.data["userPublication"][0]["mediaAvailable"];
        // this.editorData = this.data["userPublication"][0]["content"];
        this.getContent(this.data["userPublication"][0]["content"]);
        console.log("editor con", this.submissionId);
      }
    });
  }
  displayGenre() {
    this.showGenres = true;
  }
  addToMedia(img) {
    if (!this.mediaAvailable.includes(img)) {
      this.mediaAvailable.push(img);
    }
    alert("added");
  }

  getAllPublication() {
    this.service.get().subscribe((_response) => {
      this.suggestedPublication = _response.body.data;
      console.log(".", this.suggestedPublication);
    });
  }

  onSubmit(type?) {
    // const json = {};
    // json["mediaAvailable"] = this.mediaAvailable;
    // json["topic"] = this.topic;
    // json["content"] = this.editorData;
    // json["publicationId"] = this.id;
    // if (type) {
    //   json["isActive"] = true;
    // }
    const json = this.submissionForm.value;
    json["mediaAvailable"] = this.mediaAvailable;
    json["content"] = this.editorData;
    json["publicationId"] = this.id;
    json["publicationType"] = "writing";
    if (type) {
      json["isActive"] = true;
    }

    if (this.editAble) {
      this.service
        .updateUserPublishing(this.submissionId, json)
        .subscribe((_response) => {
          console.log("response", _response);
        });
    } else {
      this.service.saveUserPublishing(json).subscribe((_response) => {
        console.log("response", _response);
      });
    }
    this.getAllPublication();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.Modelconfig);
  }

  decline(): void {
    this.modalRef.hide();
  }

  updateBookmark(submissionId, type) {
    console.log("called");

    this.service
      .updateUserPublishing(submissionId, {
        publicationType: type === "add" ? "bookmark" : "",
      })
      .subscribe((_response) => {
        console.log("response", _response);
        this.getPublication(this.id);
      });
  }
}
