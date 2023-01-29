import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix';
import { saveAs } from 'file-saver'
import { Subscription } from 'rxjs';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';


@Component({
  selector: 'app-admin-create-new-pre-alerts',
  templateUrl: './admin-create-new-pre-alerts.component.html',
  styleUrls: ['./admin-create-new-pre-alerts.component.css']
})
export class AdminCreateNewPreAlertsComponent implements OnInit {

  newPreAlert: PreAlerts = {}

  user: User = {}

  userId: string = "";

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
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!;


  }

  getFile(event: any): any {
    return this.file = event.target.files[0];
  }

  onSubmitNewPreAlert() {
    this.showLoading = true;
    this.newPreAlert.trackingNumber = this.newForm.value.trackingNumber!;
    this.newPreAlert.courier = this.newForm.value.courier!;
    this.newPreAlert.description = this.newForm.value.description!;
    this.newPreAlert.status = this.newForm.value.status!
    this.newPreAlert.weight = +this.newForm.value.weight!;
    this.newPreAlert.cost = +this.newForm.value.cost!;
    this.newPreAlert.userId = this.userId!;
    this.formData.append('file', this.file || null, this.file.name || "");
    this.subscriptions.push(
      this.packageService.adminAddNewPreAlert(this.newPreAlert, this.formData).subscribe({
        next: (response: any) => {
          Notify.success("New Pre-Alert created successfully.");
          this.router.navigateByUrl('admin-dashboard');
          this.showLoading = false;

        },
        error: (httpErrorResponse: HttpErrorResponse) => {
          if (httpErrorResponse.error.message) {
            Notify.failure(httpErrorResponse.error.message);
            this.showLoading = false;

          } else {
            Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");
            this.showLoading = false;

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
          saveAs(new File([httpEvent.body], httpEvent.headers.get('File-Name')!,
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);

  }


}
