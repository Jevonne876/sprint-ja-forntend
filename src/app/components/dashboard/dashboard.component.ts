import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  toggle: boolean = false;

  toggleSideBar:boolean= false
  constructor() { }

  ngOnInit(): void {
  }

  openSideBar() {
    this.toggleSideBar = !this.toggleSideBar;
  }


}
