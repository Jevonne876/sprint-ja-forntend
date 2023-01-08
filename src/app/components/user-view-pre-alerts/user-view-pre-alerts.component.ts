import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { PreAlerts } from 'src/app/model/pre-alerts';
import * as saveAs from 'file-saver';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-user-view-pre-alerts',
  templateUrl: './user-view-pre-alerts.component.html',
  styleUrls: ['./user-view-pre-alerts.component.css']
})
export class UserViewPreAlertsComponent implements OnInit {

  trackingNum: string = "";

  private subscriptions: Subscription[] = [];

  preAlert: PreAlerts = {};

  constructor(private packageService: PackageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.trackingNum = this.route.snapshot.paramMap.get('id')!;

    this.subscriptions.push(
      this.packageService.vewPreAlert(this.trackingNum).subscribe({
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
    )
  }
}
