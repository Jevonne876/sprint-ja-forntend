import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { RoleEnum } from 'src/app/role-enum';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  user: User = {};
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  adminForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onAdminLogin() {
    this.isLoading = true;
    this.user.email = this.adminForm.value.email!;
    this.user.password = this.adminForm.value.password!;
    this.subscriptions.push(
      this.authenticationService.adminLogin(this.user).subscribe({
        next: (response: any) => {
          const token = response.headers.get("Jwt-Token");
          this.authenticationService.saveToken(token);
          this.authenticationService.saveToken(token);
          this.authenticationService.addAdminUserToLocalStorage(response.body);
          const role = response.body.role;
          if (RoleEnum.ROLE_SUPER_ADMIN === role) {
            this.router.navigateByUrl('admin-dashboard');
            Notify.success(`Welcome ${response.body.email}`);
            this.isLoading = false;
          } else {
            this.router.navigateByUrl('home');
            this.authenticationService.adminLogout();
            Notify.failure(`User does not have required permissions`);
            this.isLoading = false;
          }
          this.isLoading = false;
        },
        error: (httpErrorResponse: HttpErrorResponse) => {

          if (httpErrorResponse.error.message) {
            Notify.failure(httpErrorResponse.error.message);
            this.isLoading = false;
          } else {
            Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");
            this.isLoading = false;
          }
        }

      })
    )
  }
}
