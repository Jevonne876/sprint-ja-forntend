import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUserForm = new FormGroup({
    trn: new FormControl('', [Validators.required, Validators.minLength(9)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dob: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    phoneNumber: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    parish: new FormControl('', [Validators.required]),
    pickUpBranch: new FormControl('', [Validators.required])
  });

  user: User = {};
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.showLoading = true;
    this.user.trn = +this.newUserForm.value.trn!;
    this.user.firstName = this.newUserForm.value.firstName!;
    this.user.lastName = this.newUserForm.value.lastName!;
    this.user.dateOfBirth = new Date(this.newUserForm.value.dob!);
    this.user.email = this.newUserForm.value.email!;
    this.user.password = this.newUserForm.value.password!;
    this.user.phoneNumber = this.newUserForm.value.phoneNumber!;
    this.user.streetAddress = this.newUserForm.value.streetAddress!;
    this.user.parish = this.newUserForm.value.parish!;
    this.user.pickUpBranch = this.newUserForm.value.pickUpBranch!;
    this.subscriptions.push(
      /* this.authenticationService.register(this.user).subscribe({
         next: (response: any) => {
           Notify.success(`${this.user.firstName} your account was created successfully`);
           this.router.navigateByUrl('login');
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
       }) */
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
