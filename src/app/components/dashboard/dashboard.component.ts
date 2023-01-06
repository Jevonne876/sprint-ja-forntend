import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
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
  deliveredPackages: [] = [];
  totalPackagesNotShipped = 0;
  totalPackagesShipped = 0;
  totalPackagesReadyForPickUp = 0;

  preAlertsCount: PreAlerts = {};

  constructor(private userService: UserService, private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.userInfor = this.userService.getUserFromLocalStorage();
    this.packageService.getFinalCount(this.userInfor.userId!).subscribe((response: any) => {
      this.preAlertsCount = response;
      this.totalPackagesNotShipped = this.preAlertsCount.totalPackagesNotShipped!;
      this.totalPackagesShipped = this.preAlertsCount.totalPackagesShipped!;
      this.totalPackagesReadyForPickUp = this.preAlertsCount.totalPackagesReadyForPickUp!;

    })



  }

  openSideBar() {
    this.toggleSideBar = !this.toggleSideBar;
  }

  onLogout() {
    this.userService.logout();
    Notify.success("Logged out successfully");
    this.router.navigateByUrl('home');
  }

}
