import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';

import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { ApiResponse } from 'src/app/model/api-response';
import { Page } from 'src/app/model/page';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  apiResponse: any;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable()

  usersState$: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }> | undefined = undefined;


  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getusers().subscribe({
      next: (response: ApiResponse<Page> | HttpErrorResponse) => {
        this.apiResponse = response;
        this.currentPageSubject.next(this.apiResponse.number);
        this.responseSubject.next(this.apiResponse);
      }
    })

  }


  gotoPage(name?: string, pageNumber?: number) {
    this.adminService.getusers(pageNumber, name).pipe(map((response: ApiResponse<Page> | HttpErrorResponse) => {
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

  onUserDelete(username: string) {
    this.adminService.deleteUser(username)
      .subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('admin-dashboard');
          Notify.success(response.message)
        },
        error: (httpErrorResponse: HttpErrorResponse) => {

          if (httpErrorResponse.error.message) {
            Notify.failure(httpErrorResponse.error.message);

          } else {
            Notify.failure("AN ERROR OCCURED PLEASE TRY AGAIN..");

          }
        }
      })
  }


}
