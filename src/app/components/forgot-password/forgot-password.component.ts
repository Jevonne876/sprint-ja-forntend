import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  isLoading: boolean = false;

  userEmail: any = "";

  updatePassword = new FormGroup({
    email: new FormControl('', [Validators.required]),

  });

  private jwtHelper = new JwtHelperService();


  constructor(private userService: UserService, private route: Router) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.clear()
    }
  }


  onForgotPassword() {
    // this.route.navigateByUrl('/password-reset')
    this.userEmail = this.updatePassword.value.email!;
    // this.isLoading = true;
    this.userService.forgotPassword(this.userEmail).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token)
        this.userService.setEmail(this.userEmail);
        this.route.navigateByUrl('/password-reset')

      },
      error: (errorResponse: HttpErrorResponse) => {
        Notify.failure(errorResponse.error.message);
        this.isLoading = false;
      }
    })

  }
}
