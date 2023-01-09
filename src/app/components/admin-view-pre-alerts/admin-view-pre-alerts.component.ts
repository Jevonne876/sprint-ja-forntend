import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix';
import { PreAlerts } from 'src/app/model/pre-alerts';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-admin-view-pre-alerts',
  templateUrl: './admin-view-pre-alerts.component.html',
  styleUrls: ['./admin-view-pre-alerts.component.css']
})
export class AdminViewPreAlertsComponent implements OnInit {

  userId: string = "";

  preAlert: PreAlerts = {};

  constructor(private packageService: PackageService, private router: Router, private authentication: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.packageService.adminViewPreAlert(this.userId).subscribe({
      next: (response: any) => {
        this.preAlert = response;

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
