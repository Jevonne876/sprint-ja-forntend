import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUserForm = new FormGroup({
    trn: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl(''),
    pickUpBranch: new FormControl('', Validators.required)
  });

  user: User = {};

  constructor(private authenticationSservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.user.trn = +this.newUserForm.value.trn!;
    this.user.firstName = this.newUserForm.value.firstName!;
    this.user.lastName = this.newUserForm.value.lastName!;
    this.user.dateOfBirth = new Date(this.newUserForm.value.dob!);
    this.user.email = this.newUserForm.value.email!;
    this.user.password = this.newUserForm.value.password!;
    this.user.phoneNumber = this.newUserForm.value.phoneNumber!;
    this.user.address1 = this.newUserForm.value.address1!;
    this.user.address2 = this.newUserForm.value.address2!;
    this.user.pickUpBranch = this.newUserForm.value.pickUpBranch!;
    this.authenticationSservice.register(this.user).
      subscribe((response: any) => {
        console.log(response);
        this.newUserForm.reset();
      })
  }

}
