import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {};
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authenticatiionService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.isLoading = true;
    this.user.email = this.userForm.value.email!;
    this.user.password = this.userForm.value.password!;
    this.subscriptions.push(
      /* this.authenticatiionService.login(this.user).subscribe({
         next: (response: any) => {
           const token = response.headers.get("Jwt-Token");
           this.authenticatiionService.saveToken(token);
           this.authenticatiionService.saveToken(token);
           this.authenticatiionService.addUserToLocalStorage(response.body);
           this.router.navigateByUrl('dashboard');
           Notify.success(`Welcome ${response.body.firstName} ${response.body.lastName}`);
           this.isLoading = false;
         },
         error: (httpErrorResponse: HttpErrorResponse) => {

           if (httpErrorResponse.error.message) {
             Notify.failure(httpErrorResponse.error.message);
             this.isLoading = false;
           } else {
             Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");
             this.isLoading = false;
           }
         }

       })*/
    )
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
