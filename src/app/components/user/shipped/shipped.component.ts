import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { PackagePage } from 'src/app/model/package-page';
import { User } from 'src/app/model/user';
import { PackageService } from 'src/app/services/package.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shipped',
  templateUrl: './shipped.component.html',
  styleUrls: ['./shipped.component.css']
})
export class ShippedComponent implements OnInit {

  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<PackagePage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()
  private user: User = {};

  constructor(private packageService: PackageService, private userService: UserService) { }


  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();

    this.packageService.getAllPackagesShipped(this.user.userId!).subscribe({
      next: (response: ApiResponse<PackagePage> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);
      }
    })
  }

  gotoPage(name?: string, pageNumber?: number) {
    this.packageService.getAllPackagesShipped(this.user.userId!, pageNumber).pipe(map((response: ApiResponse<PackagePage> | HttpErrorResponse) => {
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

}
