import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Notify } from 'notiflix';
import { Subscription } from 'rxjs';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-admin-edit-pre-alerts',
  templateUrl: './admin-edit-pre-alerts.component.html',
  styleUrls: ['./admin-edit-pre-alerts.component.css']
})
export class AdminEditPreAlertsComponent implements OnInit {
  preAlert: PreAlerts = {}

  newPreAlert: PreAlerts = {}

  user: User = {}

  userId: string = "";

  packageId: string = "";

  showLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  file: any;
  formData: FormData = new FormData();

  filenames: string[] = [];

  fileStatus = { status: '', requestType: '', percent: 0 };

  newForm = new FormGroup({
    trackingNumber: new FormControl("", Validators.required),
    courier: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    weight: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),


  })

  constructor(private packageService: PackageService, private router: Router, private authentication: AuthenticationService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.packageId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.packageService.adminViewPreAlert(this.packageId).subscribe({
      next: (response: any) => {
        this.userId = response.userId
        this.newForm = new FormGroup({
          trackingNumber: new FormControl(response.trackingNumber, Validators.required),
          courier: new FormControl(response.courier, Validators.required),
          description: new FormControl(response.description, Validators.required),
          status: new FormControl(response.status, Validators.required),
          weight: new FormControl(response.weight, Validators.required),
          cost: new FormControl(response.cost, Validators.required),
        })

      }
    })
  }
  getFile(event: any): any {
    return this.file = event.target.files[0];
  }
  onSubmitNewPreAlert() {
    this.newPreAlert.trackingNumber = this.newForm.value.trackingNumber!;
    this.newPreAlert.courier = this.newForm.value.courier!;
    this.newPreAlert.description = this.newForm.value.description!;
    this.newPreAlert.status = this.newForm.value.status!
    this.newPreAlert.weight = +this.newForm.value.weight!;
    this.newPreAlert.cost = +this.newForm.value.cost!;
    this.newPreAlert.userId = this.userId!;
    console.log(this.newPreAlert);
    this.subscriptions.push(
      this.packageService.adminUpdatePreAlert(this.newPreAlert, this.packageId).subscribe({
        next: (response: any) => {
          Notify.success("Pre-Alert updated successfully.");
          this.router.navigateByUrl('admin-dashboard');

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

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
          // saveAs(new Blob([httpEvent.body!],
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

}
