import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sprint-ja-app';


  constructor(private router: Router) { }

  ngOnInit() {
    if (location.protocol !== 'https:') {
      window.location.href = location.href.replace('http:', 'https:')
    }
  }
}
