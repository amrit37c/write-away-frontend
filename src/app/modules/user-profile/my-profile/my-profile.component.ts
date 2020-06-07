import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user/user.service";
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.css"],
})
export class MyProfileComponent implements OnInit {
  count: number = 0;
  editForm: FormGroup;
  userId;
  selectedName: boolean = true;
  constructor(private formBuilder: FormBuilder, private service: UserService) {}

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      displayName: [""],
      selectDisplayName: ["false"],
      aboutInfo: [""],
      dob: [""],
      gender: [""],
      email: [""],
      mobile: [""],
      landline: [""],
      guardian: [""],
      guardianFirstName: [""],
      guardianLastName: [""],
      guardianDob: [""],
      guardianMobile: [""],
      guardianEmail: [""],
      guardianLandline: [""],
      school: [""],
      class: [""],
      section: [""],
      address: [""],
      address2: [""],
      country: [""],
      state: [""],
      city: [""],
      zipCode: [""],
    });

    // get user id
    const token = localStorage.getItem("token");
    const { id } = jwt_decode(token);
    this.userId = id;
    this.getUserInfo(); // get User info();
  }

  onSubmit() {
    const json = this.editForm.value;

    this.service.put(this.userId, json).subscribe((_response) => {});
  }

  getUserInfo() {
    this.service.get().subscribe((_response) => {
      this.editForm.patchValue(_response.body.data[0]);
      _response.body.data[0].selectDisplayName === true
        ? this.editForm.patchValue({
            selectDisplayName: "true",
          })
        : this.editForm.patchValue({
            selectDisplayName: "false",
          });
    });
  }
}
