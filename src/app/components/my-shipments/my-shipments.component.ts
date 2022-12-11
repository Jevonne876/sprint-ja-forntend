import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreAlerts } from 'src/app/model/pre-alerts';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-my-shipments',
  templateUrl: './my-shipments.component.html',
  styleUrls: ['./my-shipments.component.css']
})
export class MyShipmentsComponent implements OnInit {

  private userId: string = "";

  userPackages: PreAlerts = {};

  constructor(private route: ActivatedRoute, private packageService: PackageService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.packageService.getUserPreAlerts(this.userId).subscribe((resposne) => {
      console.log(resposne)

    })


  }

}
