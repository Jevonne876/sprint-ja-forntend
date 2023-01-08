import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notify } from 'notiflix';
import { User } from 'src/app/model/user';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-view-user',
  templateUrl: './admin-view-user.component.html',
  styleUrls: ['./admin-view-user.component.css']
})
export class AdminViewUserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService) { }

  userId: string = "";
  user: User = {};
  ngOnInit(): void {

    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.adminService.viewUserProfileDetails(this.userId).subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.error.message) {
          Notify.failure(httpErrorResponse.error.message);

        } else {
          Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");
        }
      }
    })
  }

}
