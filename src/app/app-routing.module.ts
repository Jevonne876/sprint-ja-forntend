import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';





import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AllPackagesComponent } from './components/admin/all-packages/all-packages.component';
import { CreateNewUserComponent } from './components/admin/create-new-user/create-new-user.component';
import { NotShippedPackagesComponent } from './components/admin/not-shipped-packages/not-shipped-packages.component';
import { ReadyPackagesComponent } from './components/admin/ready-packages/ready-packages.component';
import { ShippedPackagesComponent } from './components/admin/shipped-packages/shipped-packages.component';
import { UsersComponent } from './components/admin/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyShipmentsComponent } from './components/my-shipments/my-shipments.component';
import { PreAlertsComponent } from './components/pre-alerts/pre-alerts.component';
import { RatesComponent } from './components/rates/rates.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReadyComponent } from './components/user/ready/ready.component';
import { ShippedComponent } from './components/user/shipped/shipped.component';
import { EditPackageUserComponent } from './components/edit-package-user/edit-package-user.component';
import { UserViewPreAlertsComponent } from './components/user-view-pre-alerts/user-view-pre-alerts.component';
import { AdminViewUserComponent } from './components/admin-view-user/admin-view-user.component';
import { AdminCreateNewPreAlertsComponent } from './components/admin-create-new-pre-alerts/admin-create-new-pre-alerts.component';
import { AdminViewPreAlertsComponent } from './components/admin-view-pre-alerts/admin-view-pre-alerts.component';
import { AdminEditPreAlertsComponent } from './components/admin-edit-pre-alerts/admin-edit-pre-alerts.component';
import { NewAdminComponent } from './components/admin/new-admin/new-admin.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';



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
  { path: "new-pre-alert", component: PreAlertsComponent, canActivate: [AuthGuard] },
  { path: "my-pre-alerts", component: MyShipmentsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: "users", component: UsersComponent },
  { path: "admin-dashboard", component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: "all-packages", component: AllPackagesComponent, canActivate: [AdminGuard] },
  { path: "all-packages-not-shipped", component: NotShippedPackagesComponent, canActivate: [AdminGuard] },
  { path: "all-packages-shipped", component: ShippedPackagesComponent, canActivate: [AdminGuard] },
  { path: "all-packages-ready", component: ReadyPackagesComponent, canActivate: [AdminGuard] },
  { path: "new-user", component: CreateNewUserComponent, canActivate: [AdminGuard] },
  { path: "user-packages-shipped", component: ShippedComponent, canActivate: [AuthGuard] },
  { path: "user-packages-ready", component: ReadyComponent, canActivate: [AuthGuard] },
  { path: "edit-user-package/:id", component: EditPackageUserComponent, canActivate: [AuthGuard] },
  { path: "user-view-pre-alerts/:id", component: UserViewPreAlertsComponent, canActivate: [AuthGuard] },
  { path: "admin-view-users/:id", component: AdminViewUserComponent },
  { path: "admin-add-new-user-package/:id", component: AdminCreateNewPreAlertsComponent },
  { path: "admin-view-pre-alert/:id", component: AdminViewPreAlertsComponent },
  { path: "admin-edit-pre-alerts/:id", component: AdminEditPreAlertsComponent },
  { path: "new-admin", component: NewAdminComponent, canActivate: [AdminGuard] },
  { path: "admin-users", component: AdminUsersComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
