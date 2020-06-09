import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
import { UserService } from "src/app/service/user/user.service";
import * as jwt_decode from "jwt-decode";
import { MustMatch } from "src/app/helpers/must-match.validator";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  logo: string = "logo.svg";
  currentPage: boolean = false;
  currentRoute;
  modalRef: BsModalRef;
  blogRoute: boolean = false;
  ModelConfig: ModalOptions = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  calendarStartYear: number = 1960;
  calendarCurrentYear: number = new Date().getFullYear();
  selectedYear: number = new Date().getFullYear();
  selectedDate: number = new Date().getDate();
  selectedMonth: string = new Date().toLocaleString("default", {
    month: "long",
  });
  months: Array<any> = [
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
  adultUser: boolean = false;
  enableEditUserInfo: boolean = false;
  enableEditGuardianInfo: boolean = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  userLogin: boolean = false;
  username: string = "";
  email: string;
  emailSend: boolean = false;
  enablePassword: boolean = false;
  otp: string;
  password: string;
  submitted = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        if (
          this.router.url == "/home" ||
          this.router.url == "/user-profile/my-reading" ||
          this.router.url == "/user-profile/my-submissions" ||
          this.router.url == "/user-profile/my-bookmarks" ||
          this.router.url == "/user-profile/my-profile" ||
          this.router.url == "/user-profile/write-publication" ||
          this.router.url == "/user-profile/my-desk" ||
          this.router.url == "/user-profile/edit-profile"
        ) {
          this.logo = "logo.svg";
          this.currentPage = false;
          this.blogRoute = false;
          return;
        } else {
          const blogPage = this.router.url.split("/");

          if (blogPage[1] == "blogs") {
            this.logo = "logo.svg";
            this.blogRoute = true;
            this.currentPage = false;
          } else {
            this.logo = "Full-Logo-WA.svg";
            this.blogRoute = false;
            this.currentPage = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        guardian: [""],
        guardianFirstName: [""],
        guardianLastName: [""],
        guardianEmail: [""],
        guardianPassword: [""],
        guardianConfirmPassword: [""],
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        adultUser: [""],
        dob: [""],
        acceptOffer: ["", Validators.required],
        acceptTerms: [false, Validators.pattern("true")],
      },
      {
        validator: MustMatch("password", "confirmPassword"),
      }
    );

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.registerForm.patchValue({
      adultUser: this.adultUser,
      dob: new Date(
        `${this.selectedYear}/${this.selectedMonth}/${this.selectedDate}`
      ),
      acceptOffer: "1",
    });

    const token = localStorage.getItem("token");
    if (token) {
      this.userLogin = true;
      if (this.userLogin) {
        this.getUserName();
      }
    } else {
      this.userLogin = false;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  guradianValidation() {
    if (this.enableEditGuardianInfo) {
      this.registerForm = this.formBuilder.group(
        {
          guardian: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          guardianFirstName: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          guardianLastName: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          guardianEmail: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          guardianPassword: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          guardianConfirmPassword: [
            "",
            this.conditionalValidator(
              () => this.enableEditGuardianInfo === true,
              Validators.required
            ),
          ],
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          // email: ["", [Validators.required, Validators.email]],
          email: ["", [Validators.required, Validators.email]],
          password: ["", Validators.required],
          confirmPassword: ["", Validators.required],
          adultUser: [""],
          dob: [""],
          acceptOffer: ["", Validators.required],
          acceptTerms: [false, Validators.pattern("true")],
        },
        {
          validator: [
            MustMatch("password", "confirmPassword"),
            MustMatch("guardianPassword", "guardianConfirmPassword"),
          ],
        }
      );
    } else {
      this.registerForm.get("guardianFirstName").clearValidators();
    }
  }

  conditionalValidator(
    condition: () => boolean,
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.patchValue({
      dob: new Date(
        `${this.selectedYear}/${this.selectedMonth}/${this.selectedDate}`
      ),
    });
    let json = this.registerForm.value;
    // json.dob = formatDate;

    this.userService.register(json).subscribe((_response) => {
      if (_response.body.status == "Success") {
        alert("user registered");
        this.decline();
        this.registerForm.reset();
      } else {
        alert("Email Already Register");
      }
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    let json = this.loginForm.value;

    this.userService.login(json).subscribe((_response) => {
      if (_response.status == 200 && _response.body.status == "Success") {
        this.userLogin = true;
        const token = _response.body.data.token;
        const { firstName } = jwt_decode(token);
        this.username = firstName;
        localStorage.setItem("token", _response.body.data.token);
      }
      alert(_response.body.message);
      this.decline();
      this.loginForm.reset();

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(["/home"]);
    });
  }

  setUserName(name) {
    console.log("DEBUGGGER CALLed");
    this.username = name;
  }

  checkPassword(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("confirmPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  openModal(template: TemplateRef<any>) {
    this.selectedYear = new Date().getFullYear();
    this.selectedDate = new Date().getDate();
    this.selectedMonth = new Date().toLocaleString("default", {
      month: "long",
    });
    this.modalRef = this.modalService.show(template, this.ModelConfig);
  }

  getYears() {
    let years: number[] = [];
    for (let i = this.calendarStartYear; i <= this.calendarCurrentYear; i++) {
      years.push(i);
    }
    return years;
  }

  getDates() {
    let days: number[] = [];
    const dateCurMonth = this.getMonthDates();
    for (let i = 1; i <= dateCurMonth; i++) {
      days.push(i);
    }
    return days;
  }

  getMonthDates() {
    const month = this.months.findIndex((month) => month == this.selectedMonth);
    const dateCurrentMonth = new Date(this.selectedYear, month, 0).getDate();
    return dateCurrentMonth;
  }

  calculateAge() {
    const today = new Date();
    const dateString = `${this.selectedYear}/${this.selectedMonth}/${this.selectedDate}`;
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.enableEditUserInfo = true;
    if (age >= 18) {
      this.adultUser = true;
    } else {
      this.adultUser = false;
    }
    return age;
  }

  enableGuardianForm() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const age = this.calculateAge();
    age < 18
      ? (this.enableEditGuardianInfo = true)
      : (this.enableEditGuardianInfo = false);
  }
  decline(): void {
    this.enableEditGuardianInfo = false;
    this.enableEditUserInfo = false;
    this.enablePassword = false;
    this.emailSend = false;
    this.adultUser = false;
    this.modalRef.hide();
    this.submitted = false;
  }

  logout() {
    localStorage.removeItem("token");
    this.userLogin = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/home"]);
    // this.router.navigateByUrl("/home");
  }

  sendEmail() {
    const data = { email: this.email };
    this.userService.sendEmail(data).subscribe((_response) => {
      if (_response.body.status == "Failure") {
      } else {
        this.emailSend = true;
      }
      alert(_response.body.message);
    });
  }
  verifyOTP() {
    const data = { email: this.email, otp: this.otp };
    this.userService.verifyOTP(data).subscribe((_response) => {
      if (_response.body.status === "Failure") {
      } else {
        this.enablePassword = true;
      }
      alert(_response.body.message);
    });
  }
  updatePassword() {
    const data = { email: this.email, password: this.password };
    this.userService.updatePassword(data).subscribe((_response) => {
      alert(_response.body.message);
      this.decline();
      this.emailSend = false;
      this.email = "";
      this.password = "";
      this.otp = "";
    });
  }

  getUserName() {
    this.userService
      .get()
      .subscribe((_response) => this.changeName(_response.body.data[0]));
  }
  private changeName(data): void {
    this.username =
      data.selectDisplayName === true
        ? data.displayName
        : `${data.firstName} ${data.lastName} `;
  }
}
