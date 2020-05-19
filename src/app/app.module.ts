import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/header/header.component";
import { LoginComponent } from "./modules/login/login.component";
import { ComponentsModule } from "./components/components.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  LocationStrategy,
  HashLocationStrategy,
  CommonModule,
  PathLocationStrategy,
} from "@angular/common";
import { SignupComponent } from "./modules/signup/signup.component";

import { ModalModule } from "ngx-bootstrap/modal";
import { FooterComponent } from "./shared/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ForgetPassComponent } from './modules/forget-pass/forget-pass.component';

import { BsDropdownModule } from "ngx-bootstrap/dropdown";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    ForgetPassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    ComponentsModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
