import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { User } from 'src/app/model/user';
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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userInfor = this.userService.getUserFromLocalStorage();

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
