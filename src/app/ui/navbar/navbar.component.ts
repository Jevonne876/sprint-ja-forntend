import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  toggle: boolean = true;


  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit(): void {
  }

  onClickScroll(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);

  }
}
