import { Component, OnInit } from '@angular/core';
import { ApplicationInfo } from 'src/app/model/application-info';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { PackagePage } from 'src/app/model/package-page';
import { AdminService } from 'src/app/service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Notify } from 'notiflix';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  toggle: boolean = false;
  toggleSideBar: boolean = false
  data: ApplicationInfo = {};
  admin: User = {};

  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<PackagePage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()


  constructor(private packageService: PackageService, private authenticationService: AuthenticationService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.admin = this.authenticationService.getAdminUserFromLocalStorage();
    this.packageService.getApplicationData().subscribe({
      next: ((response: any) => {
        this.data = response;
      }),
    })
    this.adminService.getAllPackagesDelivered().subscribe({
      next: (response: ApiResponse<PackagePage> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);

      }
    })
  }

  gotoPage(name?: string, pageNumber?: number) {
    this.adminService.getAllPackagesDelivered(pageNumber).pipe(map((response: ApiResponse<PackagePage> | HttpErrorResponse) => {
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

  openSideBar() {
    this.toggleSideBar = !this.toggleSideBar;
  }

  onLogout() {
    this.authenticationService.adminLogout();
    Notify.success("Logged out successfully");
    this.router.navigateByUrl('admin-login');
  }

}
