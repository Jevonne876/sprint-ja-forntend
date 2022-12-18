import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-pre-alerts',
  templateUrl: './pre-alerts.component.html',
  styleUrls: ['./pre-alerts.component.css']
})
export class PreAlertsComponent implements OnInit {

  newPreAlert: PreAlerts = {}
  user: User = {}
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  newForm = new FormGroup({
    trackingNumber: new FormControl("", Validators.required),
    courier: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    weight: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),
  })

  constructor(private packageService: PackageService, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authentication.getUserFromLocalStorage()
  }


  onSubmitNewPreAlert() {

    this.newPreAlert.trackingNumber = this.newForm.value.trackingNumber!;
    this.newPreAlert.courier = this.newForm.value.courier!;
    this.newPreAlert.description = this.newForm.value.description!;
    this.newPreAlert.weight = +this.newForm.value.weight!;
    this.newPreAlert.cost = +this.newForm.value.cost!;
    this.newPreAlert.userId = this.user.userId!;
    this.subscriptions.push(
      this.packageService.addNewPreAlert(this.newPreAlert).subscribe({
        next: (response: any) => {
          Notify.success("New Pre-Alert created successfully.");
          this.router.navigateByUrl('dashboard');

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
