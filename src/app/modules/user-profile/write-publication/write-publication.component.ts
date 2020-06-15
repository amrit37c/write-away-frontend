import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { PublicationService } from "src/app/service/publications/publication.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as jwt_decode from "jwt-decode";
import { environment } from "../../../../environments/environment";
@Component({
  selector: "app-write-publication",
  templateUrl: "./write-publication.component.html",
  styleUrls: ["./write-publication.component.css"],
})
export class WritePublicationComponent implements OnInit {
  url = environment.url;
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

  editorData = "<p>t</p>";
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
  copiedLink: string;
  kickStartInfo: string;

  constructor(
    private service: PublicationService,
    private activateRouter: ActivatedRoute,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private router: Router
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
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
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
      this.kickStartInfo = this.data["kickstarter"];
      console.log("this", this.data["kickstarter"]);
      if (this.data["userPublication"] && this.data["userPublication"].length) {
        this.editAble = true;
        this.submissionId = this.data["userPublication"][0]["_id"];
        this.submissionForm.patchValue(this.data["userPublication"][0]);
        this.mediaAvailable = this.data["userPublication"][0]["mediaAvailable"];
        this.editorData = this.data["userPublication"][0]["content"];
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
    alert("Added");
  }

  removeMedia(img) {
    this.mediaAvailable = this.mediaAvailable.filter((el) => el != img);
    alert("Removed");
  }
  getAllPublication() {
    this.service
      .get({ isPublished: false, publicationStatus: "2" })
      .subscribe((_response) => {
        let filterArr = _response.body.data;

        // remove display publication for suggested
        this.suggestedPublication = filterArr.filter((el) => el._id != this.id);
      });
  }

  onSubmit(type?) {
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
        .subscribe((_response) => {});
    } else {
      this.service.saveUserPublishing(json).subscribe((_response) => {
        let message = "Publish Content Saved";
        if (type) {
          message = "Publish Content Updated";
        }
        alert(message);
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
    this.service
      .updateUserPublishing(submissionId, {
        publicationType: type === "add" ? "bookmark" : "",
      })
      .subscribe((_response) => {
        this.getPublication(this.id);
      });
  }

  publicationBookMarkStatus(publication) {
    return publication &&
      publication[0] &&
      publication[0].bookMarkStatus === "1"
      ? " fa-bookmark"
      : "fa-bookmark-o";
  }

  savePublicationBookMark(publication) {
    this.service
      .postBookMark({
        bookMarkStatus: 1,
        publicationId: this.id,
      })
      .subscribe((_response) => {
        this.getPublication(this.id); //get single publication
      });
  }

  updatePublicationBookMark(publication) {
    this.service
      .putBookMark(publication[0]._id, {
        bookMarkStatus: publication[0].bookMarkStatus === "0" ? 1 : 0,
        publicationId: publication[0]._id,
      })
      .subscribe((_response) => {
        this.getPublication(this.id); //get single publication
      });
  }

  // publicationBookMarkStatus(publication) {
  //   return publication &&
  //     publication.bookmark &&
  //     publication.bookmark.bookMarkStatus === "1"
  //     ? " fa-bookmark"
  //     : "fa-bookmark-o";
  // }

  getBrief(brief) {
    return brief.substr(0, 100);
  }

  openShareModal(template: TemplateRef<any>, id) {
    this.copyBlogLink(id, "publication");
    this.modalRef = this.modalService.show(template);
  }

  copyBlogLink(id, type?) {
    if (type == "publication") {
      this.copiedLink = "http://demo.writeawayy.com/publication/" + id;
    } else {
      this.copiedLink = "http://demo.writeawayy.com/blogs/" + id;
    }
  }

  kickInfo(type) {
    if (type === "starter") {
      this.kickStartInfo = this.data["kickstarter"];
    } else {
      this.kickStartInfo = this.data["kickbookDesc"];
    }
  }
}
