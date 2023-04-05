import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.css']
})
export class AdminUserUpdateComponent implements OnInit {


  user: User = {};
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  userId: string;

  newUserForm = new FormGroup({
    trn: new FormControl(this.user.trn!,),
    firstName: new FormControl(this.user.firstName!, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(this.user.lastName!, [Validators.required, Validators.minLength(3)]),
    dob: new FormControl(this.user.dateOfBirth!,),
    email: new FormControl(this.user.email!, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(this.user.phoneNumber!, [Validators.required]),
    streetAddress: new FormControl(this.user.streetAddress!,),
    parish: new FormControl(this.user.parish!,),
    pickUpBranch: new FormControl(this.user.pickUpBranch!,)
  });


  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    })

    this.userService.getUserByUserId(this.userId).subscribe((response: any) => {
      this.user = response;
      this.newUserForm = new FormGroup({
        trn: new FormControl(this.user.trn!,),
        firstName: new FormControl(this.user.firstName!, [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl(this.user.lastName!, [Validators.required, Validators.minLength(3)]),
        dob: new FormControl(this.user.dateOfBirth!,),
        email: new FormControl(this.user.email!, [Validators.required, Validators.email]),
        phoneNumber: new FormControl(this.user.phoneNumber!, [Validators.required]),
        streetAddress: new FormControl(this.user.streetAddress!,),
        parish: new FormControl(this.user.parish!,),
        pickUpBranch: new FormControl(this.user.pickUpBranch!,)
      });

      console.log(this.user.pickUpBranch);
    })


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
      this.adminService.updateUserAccountDetails(this.user).subscribe({
        next: (response: any) => {
          Notify.success(`${this.user.firstName} ${this.user.lastName} account details was updated successfully`);
          this.router.navigateByUrl('users');
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
