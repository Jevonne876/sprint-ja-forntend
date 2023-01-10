import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  newUserForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  user: User = {};
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.showLoading = true;

    this.user.firstName = this.newUserForm.value.firstName!;
    this.user.lastName = this.newUserForm.value.lastName!;
    this.user.username = this.newUserForm.value.username!;
    this.user.password = this.newUserForm.value.password!;

    this.subscriptions.push(
      this.authenticationService.adminRegister(this.user).subscribe({
        next: (response: any) => {
          Notify.success(`${this.user.firstName} ${this.user.lastName} account was created successfully`);
          this.router.navigateByUrl('admin-dashboard');
          this.showLoading = false;
        },
        error: (httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.error.message) {
            Notify.failure(httpErrorResponse.error.message);
            this.showLoading = false;
          } else {
            Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");
            this.showLoading = false;
          }
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
