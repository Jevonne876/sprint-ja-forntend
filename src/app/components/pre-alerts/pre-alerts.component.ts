import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notify } from 'notiflix';
import { saveAs } from 'file-saver'
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

  file: any;
  formData: FormData = new FormData();

  filenames: string[] = [];

  fileStatus = { status: '', requestType: '', percent: 0 };


  newForm = new FormGroup({
    trackingNumber: new FormControl("", Validators.required),
    courier: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    weight: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),

  })

  constructor(private packageService: PackageService, private router: Router, private authentication: AuthenticationService, private route: ActivatedRoute) { }

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
    this.formData.append('file', this.file, this.file.name);

    this.subscriptions.push(
      this.packageService.addNewPreAlert(this.newPreAlert, this.formData).subscribe({
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

  getFile(event: any): any {
    return this.file = event.target.files[0];
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
