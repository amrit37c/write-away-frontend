import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { ToastrService } from 'ngx-toastr';
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
import { CookieService } from "angular2-cookie/core";

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
  enableUserForm: boolean = false;
  otp: string;
  password: string;
  submitted = false;
  enableSignOTP = false;
  enableSignInOTP = false;
  checkCookies = false;

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _cookieService: CookieService,
    private toastr: ToastrService
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
          this.logo = "Full-Logo-WA.svg";
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
            this.logo = "logo.svg";
            this.blogRoute = false;
            this.currentPage = false;
          }
        }
      }
    });
  }

  ngOnInit() {
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
      remember: [false],
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

    const email = this.getCookie("email");
    const password = this.getCookie("password");
    if (email != "" && password != "") {
      this.loginForm.patchValue({
        email: email,
        password: password,
        remember: true,
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }
  setCookies() {
    if (this.loginForm.value.remember === true) {
      console.log("remove");
      this._cookieService.put("email", "");
      this._cookieService.put("password", "");
    } else {
      console.log("set");
      this._cookieService.put("email", this.loginForm.value.email);
      this._cookieService.put("password", this.loginForm.value.password);
    }
  }

  guradianValidation() {
    console.log("validation applied");
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
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
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
    this.email = json.email;
    // json.dob = formatDate;

    this.userService.register(json).subscribe((_response) => {
      if (_response.body.message === "User already exist!") {
        this.enableSignOTP = true;
        this.enableUserForm = false;
      }
      if (_response.body.message === "Please verify account first") {
        this.enableSignOTP = true;
        this.enableUserForm = false;
      }
      if (_response.body.status == "Success") {
        alert(_response.body.message);
        // this.decline();
        this.registerForm.reset();
        this.enableUserForm = false;
        this.enableSignOTP = true;
      } else {
        alert(_response.body.message);
      }
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    let json = this.loginForm.value;
    this.email = json.email;

    this.userService.login(json).subscribe((_response) => {
      if (_response.status == 200 && _response.body.status == "Success") {
        this.userLogin = true;
        const token = _response.body.data.token;
        const { firstName } = jwt_decode(token);
        this.username = firstName;
        localStorage.setItem("token", _response.body.data.token);
        alert(_response.body.message);
        this.decline();
        this.loginForm.reset();

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(["/home"]);
      }

      if(_response.status == 200 && _response.body.status == 'Failure') {
        this.toastr.error('Oops! The Username and/or Password does not match. Please try again!');
      }

      if (_response.body.message === "Please verify account first") {
        this.enableSignInOTP = true;
      }
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
    const email = this.getCookie("email");
    const password = this.getCookie("password");
    if (email != "" && password != "") {
      this.loginForm.patchValue({
        email: email,
        password: password,
        remember: true,
      });
    }
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
      this.enableUserForm = true;
      this.adultUser = true;
      this.enableEditGuardianInfo = false;
    } else {
      this.adultUser = false;
      this.enableEditGuardianInfo = true;
    }
    return age;
  }

  showUserForm() {
    this.submitted = true;
    if (
      this.registerForm.controls["guardian"].valid &&
      this.registerForm.controls["guardianFirstName"].valid &&
      this.registerForm.controls["guardianLastName"].valid &&
      this.registerForm.controls["guardianEmail"].valid
    ) {
      console.log("Valid!");
      this.enableUserForm = true;
      this.enableEditGuardianInfo = false;
    }

    // this.enableUserForm = true;

    if (this.registerForm.invalid) {
      return;
    }
    // const age = this.calculateAge();
    // age < 18 ? (this.enableUserForm = false) : (this.enableUserForm = true);
  }
  decline(): void {
    this.enableEditGuardianInfo = false;
    this.enableEditUserInfo = false;
    this.enablePassword = false;
    this.emailSend = false;
    this.adultUser = false;
    this.modalRef.hide();
    this.submitted = false;
    this.enableSignOTP = false;
    this.enableSignInOTP = false;
    this.otp = "";
    this.email = "";
  }

  logout() {
    localStorage.removeItem("token");
    this.userLogin = false;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/home"]);
    // this.router.navigateByUrl("/home");
  }

  sendEmail(resent, type?) {
    const data = { email: this.email };
    if (type == "signup") {
      this.userService.reSendOTP(data).subscribe((_response) => {
        if (_response.body.status == "Failure") {
        } else {
          this.emailSend = true;
        }
        if (resent) {
          alert("Mail Send done, Please check your inbox!");
        } else {
          alert(_response.body.message);
        }
      });
    } else {
      this.userService.sendEmail(data).subscribe((_response) => {
        if (_response.body.status == "Failure") {
        } else {
          this.emailSend = true;
        }
        if (resent) {
          alert("Mail Send done, Please check your inbox!");
        } else {
          alert(_response.body.message);
        }
      });
    }
  }
  verifyForgetOTP() {
    const data = { email: this.email, otp: this.otp };
    this.userService.verifyOTP(data).subscribe((_response) => {
      if (_response.body.status === "Failure") {
      } else {
        this.enablePassword = true;
      }
      alert(_response.body.message);
    });
  }
  verifySignUpOTP() {
    const data = { email: this.email, otp: this.otp };
    this.userService.verifySignupOTP(data).subscribe((_response) => {
      if (_response.body.status === "Failure") {
      } else {
        this.decline();
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
    if(typeof data == 'undefined') {
      this.username = 'User';
    } else {
      this.username =
      data && data.selectDisplayName === true
        ? data.displayName
        : `${data.firstName} ${data.lastName} `;
    }
    
  }
}
