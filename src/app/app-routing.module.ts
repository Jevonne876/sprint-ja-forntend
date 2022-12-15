import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: "sign-up", component: SignUpComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "new-pre-alert", component: PreAlertsComponent, canActivate: [AuthGuard] },
  { path: "my-pre-alerts/:id", component: MyShipmentsComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
