import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { PackagePage } from 'src/app/model/package-page';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { User } from 'src/app/model/user';
import { PackageService } from 'src/app/services/package.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-shipments',
  templateUrl: './my-shipments.component.html',
  styleUrls: ['./my-shipments.component.css']
})
export class MyShipmentsComponent implements OnInit {

  userId: string = "";

  userPackages: PreAlerts[] = [];
  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<PackagePage>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()
  private user: User = {};

  constructor(private route: ActivatedRoute, private packageService: PackageService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.packageService.getUserPreAlerts(this.userId).subscribe((resposne: any) => {
      this.userPackages = resposne;
    })

    this.user = this.userService.getUserFromLocalStorage();

    this.packageService.getAllPackagesNotShipped(this.user.userId!).subscribe({
      next: (response: ApiResponse<PackagePage> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);

      }
    })
  }

  gotoPage(name?: string, pageNumber?: number) {
    this.packageService.getAllPackagesNotShipped(this.user.userId!, pageNumber).pipe(map((response: ApiResponse<PackagePage> | HttpErrorResponse) => {
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
function startWith(value: ApiResponse<PackagePage>): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}

