import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggle: boolean = true;
  isLoggedIn: boolean = false;


  constructor(private viewportScroller: ViewportScroller, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
  }

  onClickScroll(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);

  }
}
