import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  constructor(private route: Router) { }

  isLoading: boolean = false;

  updatePassword = new FormGroup({
    password: new FormControl('', [Validators.required]),

  });

  ngOnInit(): void {
  }

  onPasswordReset() {
    this.route.navigateByUrl('/login')
    // this.userEmail = this.updatePassword.value.email!;
    // this.isLoading = true;
    // this.userService.resetPassword(this.userEmail).subscribe({
    //   next: (resposne: any) => {
    //     Notify.success("Your new password was sent to your email.");
    //     this.route.navigateByUrl('/login')

    //   },
    //   error: (errorResponse: HttpErrorResponse) => {
    //     Notify.failure(errorResponse.error.message);
    //     this.isLoading = false;
    //   }
    // })

  }

}
