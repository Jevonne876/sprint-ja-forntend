import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Notify } from 'notiflix';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private route: Router, private userService: UserService) { }


  isLoading: boolean = false;
  userEmail: string = ""
  private jwtHelper = new JwtHelperService();
  token: any;

  updatePassword = new FormGroup({
    password: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {

    this.token = localStorage.getItem('token');

    if (this.jwtHelper.isTokenExpired(this.token) || this.token === null) {
      localStorage.clear()
      this.route.navigateByUrl('/login')
    }
    this.userService.data$.subscribe(data => {
      this.userEmail = data;
    })
  }

  onPasswordReset() {
    this.isLoading = true;
    this.userService.resetPassword(this.userEmail, this.updatePassword.value.password!).subscribe({
      next: (response: any) => {
        localStorage.clear()
        this.route.navigateByUrl('/login')
        Notify.success("Password updated successfully")
      },
      error: (errorResponse: Boolean) => {
        Notify.success("Password updated successfully")
        this.isLoading = false;
        if (this.jwtHelper.isTokenExpired(this.token) || this.token === null) {
          localStorage.clear()
          this.route.navigateByUrl('/login')
        }

      }
    })
  }

}

