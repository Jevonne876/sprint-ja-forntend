import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {

  newUserForm = new FormGroup({
    trn: new FormControl('',),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dob: new FormControl('',),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('',),
    parish: new FormControl('',),
    pickUpBranch: new FormControl('',)
  });

  user: User = {};
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService, private router: Router) { }
  ngOnInit(): void {
  }

  onSubmit() {
    this.showLoading = true;
    this.user.trn = +this.newUserForm.value.trn!;
    this.user.firstName = this.newUserForm.value.firstName!;
    this.user.lastName = this.newUserForm.value.lastName!;
    this.user.dateOfBirth = new Date(this.newUserForm.value.dob!);
    this.user.email = this.newUserForm.value.email!;
    this.user.phoneNumber = this.newUserForm.value.phoneNumber!;
    this.user.streetAddress = this.newUserForm.value.streetAddress!;
    this.user.parish = this.newUserForm.value.parish!;
    this.user.pickUpBranch = this.newUserForm.value.pickUpBranch!;
    console.log(this.user);
    this.subscriptions.push(
      this.adminService.register(this.user).subscribe({
        next: (response: any) => {
          Notify.success(`${this.user.firstName} account was created successfully`);
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
