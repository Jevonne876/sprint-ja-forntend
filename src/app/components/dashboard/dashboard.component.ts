import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { map, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { PackagePage } from 'src/app/model/package-page';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
import { UserPackageInfor } from 'src/app/model/user-package-info';
import { PackageService } from 'src/app/services/package.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggle: boolean = false;
  toggleSideBar: boolean = false
  @Input() userInfor: User = {};
  preAlertsCount: PreAlerts = {};
  userPackageInfo: UserPackageInfor = {};
  adminService: any;
  apiResponse: any;
  currentPageSubject: any;
  responseSubject: any;

  constructor(private userService: UserService, private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.userInfor = this.userService.getUserFromLocalStorage();
    this.packageService.getFinalCount(this.userInfor.userId!).subscribe((response: any) => {
      this.userPackageInfo = response;
    })
    this.packageService.getAllPackagesDelivered(this.userInfor.userId!).subscribe(
      (response: any) => {
        this.apiResponse = response;
      }

    )
  }

  openSideBar() {
    this.toggleSideBar = !this.toggleSideBar;
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

  onLogout() {
    this.userService.logout();
    Notify.success("Logged out successfully");
    this.router.navigateByUrl('home');
  }

}
