import { Component, OnInit } from '@angular/core';
import { ApplicationInfo } from 'src/app/model/application-info';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PackageService } from 'src/app/services/package.service';

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

  constructor(private packageService: PackageService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.admin = this.authenticationService.getAdminUserFromLocalStorage();
    this.packageService.getApplicationData().subscribe({
      next: ((response: any) => {
        this.data = response;
      }),

    })
  }

}
