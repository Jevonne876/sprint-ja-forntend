import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AllPackagesComponent } from './components/admin/all-packages/all-packages.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyShipmentsComponent } from './components/my-shipments/my-shipments.component';
import { PreAlertsComponent } from './components/pre-alerts/pre-alerts.component';
import { RatesComponent } from './components/rates/rates.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "about-us", component: HomeComponent },
  { path: "contact-us", component: HomeComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "rates", component: RatesComponent },
  { path: "login", component: LoginComponent },
  { path: "admin-login", component: AdminLoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "admin-dashboard", component: AdminDashboardComponent },
  { path: "new-pre-alert", component: PreAlertsComponent, canActivate: [AuthGuard] },
  { path: "my-pre-alerts/:id", component: MyShipmentsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: "users", component: UsersComponent },
  { path: "all-packages", component: AllPackagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
