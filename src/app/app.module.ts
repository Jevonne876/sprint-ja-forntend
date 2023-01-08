import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { PreAlertsComponent } from './components/pre-alerts/pre-alerts.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MyShipmentsComponent } from './components/my-shipments/my-shipments.component';
import { RatesComponent } from './components/rates/rates.component';
import { WhatWeDoComponent } from './components/what-we-do/what-we-do.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AllPackagesComponent } from './components/admin/all-packages/all-packages.component';
import { NotShippedPackagesComponent } from './components/admin/not-shipped-packages/not-shipped-packages.component';
import { ShippedPackagesComponent } from './components/admin/shipped-packages/shipped-packages.component';
import { ReadyPackagesComponent } from './components/admin/ready-packages/ready-packages.component';
import { CreateNewUserComponent } from './components/admin/create-new-user/create-new-user.component';
import { ShippedComponent } from './components/user/shipped/shipped.component';
import { ReadyComponent } from './components/user/ready/ready.component';
import { EditPackageUserComponent } from './components/edit-package-user/edit-package-user.component';
import { UserViewPreAlertsComponent } from './components/user-view-pre-alerts/user-view-pre-alerts.component';
import { AdminViewPreAlertsComponent } from './components/admin-view-pre-alerts/admin-view-pre-alerts.component';
import { AdminViewUserComponent } from './components/admin-view-user/admin-view-user.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    AboutUsComponent,
    HowItWorksComponent,
    FaqsComponent,
    ContactUsComponent,
    LocationsComponent,
    ShoppingComponent,
    PreAlertsComponent,
    MyShipmentsComponent,
    RatesComponent,
    WhatWeDoComponent,
    ForgotPasswordComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UsersComponent,
    AdminsComponent,
    AllPackagesComponent,
    NotShippedPackagesComponent,
    ShippedPackagesComponent,
    ReadyPackagesComponent,
    CreateNewUserComponent,
    ShippedComponent,
    ReadyComponent,
    EditPackageUserComponent,
    UserViewPreAlertsComponent,
    AdminViewPreAlertsComponent,
    AdminViewUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
