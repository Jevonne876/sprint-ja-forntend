import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-package-user',
  templateUrl: './edit-package-user.component.html',
  styleUrls: ['./edit-package-user.component.css']
})
export class EditPackageUserComponent implements OnInit {


  newPreAlert: PreAlerts = {}

  user: User = {}

  showLoading: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
