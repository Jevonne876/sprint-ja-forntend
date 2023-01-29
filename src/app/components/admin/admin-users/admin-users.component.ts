import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Notify } from 'notiflix';

import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { Page } from 'src/app/model/page';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()

  usersState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }> | undefined = undefined;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe({
      next: (response: ApiResponse<Page> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);
      }
    })

  }

  deleteAdmin(username: string) {
    this.adminService.deleteUser(username).subscribe(
      (response: CustomHttpResponse) => {
        this.router.navigateByUrl('admin-dashboard');
        Notify.success(response.message);



      },
      (error: HttpErrorResponse) => {
        Notify.failure(error.error.message);

      }
    );


  }

  gotoPage(name?: string, pageNumber?: number) {
    this.adminService.getusers(pageNumber).pipe(map((response: ApiResponse<Page> | HttpErrorResponse) => {
      this.apiResponse = response;
      this.currentPageSubject.next(pageNumber);
      this.responseSubject.next(this.apiResponse);
      console.log(response);
    }),
      startWith(this.responseSubject.value),
    ).subscribe()
  }

  gotoNextOrPerviousPage(directory?: string, name?: string,): void {
    this.gotoPage('', directory === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);

  }

}
