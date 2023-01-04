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
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
