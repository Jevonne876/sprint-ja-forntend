import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { Notify } from 'notiflix';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { PackagePage } from 'src/app/model/package-page';
import { AdminService } from 'src/app/service/admin.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-all-packages',
  templateUrl: './all-packages.component.html',
  styleUrls: ['./all-packages.component.css']
})
export class AllPackagesComponent implements OnInit {

  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<PackagePage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()


  fileService: any;
  fileStatus: any;
  filenames: any;

  constructor(private adminService: AdminService, private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAllPackages().subscribe({
      next: (response: ApiResponse<PackagePage> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);

      }
    })
  }

  gotoPage(trackingNumber?: string, pageNumber?: number) {
    this.adminService.getAllPackages(pageNumber, trackingNumber).pipe(map((response: ApiResponse<PackagePage> | HttpErrorResponse) => {
      this.apiResponse = response;
      this.currentPageSubject.next(pageNumber);
      this.responseSubject.next(this.apiResponse);
    }),
      startWith(this.responseSubject.value),
    ).subscribe()
  }

  gotoNextOrPerviousPage(directory?: string, name?: string,): void {
    this.gotoPage('', directory === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);

  }

  onDownloadFile(filename: string): void {
    this.packageService.adminDownload(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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

  onPackageDelete(trackingNumber: string) {
    this.adminService.deletePackage(trackingNumber).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('admin-dashboard');
        Notify.success(response.message);

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
