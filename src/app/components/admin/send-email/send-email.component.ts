import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  isLoading: boolean = false;



  emailForm = new FormGroup({
    subject: new FormControl(""),
    email: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required])
  });

 
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.emailForm.value);
    this.isLoading = true;
    this.adminService.sendEmail(this.emailForm.value.email, this.emailForm.value.subject, this.emailForm.value.message).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('admin-dashboard');
        Notify.success(response.message);

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
    })
  }

}
