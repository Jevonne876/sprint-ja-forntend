import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit, OnDestroy {

  user: User = {};
  updatedUser: User = {};
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  updateUserForm = new FormGroup({
    trn: new FormControl(this.user.trn!, [Validators.required, Validators.minLength(9)]),
    firstName: new FormControl(this.user.firstName!, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(this.user.lastName!, [Validators.required, Validators.minLength(3)]),
    dob: new FormControl(this.user.dateOfBirth!, [Validators.required]),
    email: new FormControl(this.user.email!, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(this.user.phoneNumber!, [Validators.required]),
    streetAddress: new FormControl(this.user.streetAddress!, [Validators.required]),
    parish: new FormControl(this.user.parish!, [Validators.required]),
    pickUpBranch: new FormControl(this.user.pickUpBranch!, [Validators.required])
  })

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.userService.getUserByUserId(this.user.userId).subscribe((response: any) => {
      this.user = response;
    })
    this.updateUserForm = new FormGroup({
      trn: new FormControl(this.user.trn!, [Validators.required, Validators.minLength(9)]),
      firstName: new FormControl(this.user.firstName!, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(this.user.lastName!, [Validators.required, Validators.minLength(3)]),
      dob: new FormControl(this.user.dateOfBirth!, [Validators.required]),
      email: new FormControl(this.user.email!, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber!, [Validators.required]),
      streetAddress: new FormControl(this.user.streetAddress!, [Validators.required]),
      parish: new FormControl(this.user.parish!, [Validators.required]),
      pickUpBranch: new FormControl(this.user.pickUpBranch!, [Validators.required])
    })
  }
  onSubmit() {
    this.showLoading = true;
    this.user.trn = +this.updateUserForm.value.trn!;
    this.user.firstName = this.updateUserForm.value.firstName!;
    this.user.lastName = this.updateUserForm.value.lastName!;
    this.user.email = this.updateUserForm.value.email!;
    this.user.phoneNumber = this.updateUserForm.value.phoneNumber!;
    this.user.streetAddress = this.updateUserForm.value.streetAddress!;
    this.user.parish = this.updateUserForm.value.parish!;
    this.user.pickUpBranch = this.updateUserForm.value.pickUpBranch!;
    this.subscriptions.push(
      this.userService.updateUser(this.user).subscribe({
        next: (response: any) => {
          this.authenticationService.logout();
          this.router.navigateByUrl('/login')
          Notify.success(`${this.user.firstName} your account was updated successfully,Please re-login.`);
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
