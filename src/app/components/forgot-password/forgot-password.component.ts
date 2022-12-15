import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';

import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading: boolean = false;

  userEmail: string = "";

  updatePassword = new FormGroup({
    email: new FormControl('', [Validators.required]),

  });


  constructor(private userService: UserService, private route: Router) { }

  ngOnInit(): void {
  }

  onPasswordReset() {
    this.userEmail = this.updatePassword.value.email!;
    this.userService.resetPassword(this.userEmail).subscribe({
      next: (resposne: any) => {
        Notify.success(resposne.message);
        this.route.navigateByUrl('/login')
      },
      error: (errorResponse: HttpErrorResponse) => {
        Notify.warning(errorResponse.error.message);
      }
    })

  }
}
