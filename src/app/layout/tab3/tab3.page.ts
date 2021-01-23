import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { SlotsService } from '../../services/slots.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Factory, Users, FiringOrRework, Size, TypeOfFormers, Defetcs } from 'src/app/entities/topglove.domain.model';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  _factory: string[] = Factory.data;
  factory: string = this._factory[0];

  _users: string[] = Users.data;

  from: string = moment().format("YYYY-MM-DD");
  to: string = moment().format("YYYY-MM-DD");

  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = [this.factory];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [
    { data: [65], label: 'Defect A' },
    { data: [28], label: 'Defect B' },
    { data: [65], label: 'Defect C' },
    { data: [95], label: 'Defect D' },
    { data: [65], label: 'Defect E' },
    { data: [34], label: 'Defect F' }
  ];

  public stackedBarChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{ stacked: true }], yAxes: [{ stacked: true }]
    },
  };

  public stackedBarChartLabels: Label[] = this._users;
  public stackedBarChartType: ChartType = 'horizontalBar';
  public stackedBarChartLegend = true;

  public stackedarChartData: ChartDataSets[] = [
    { data: [6, 8], label: 'Accepted', backgroundColor: '#2dd36f' },
    { data: [2, 4], label: 'Rejected', backgroundColor: '#eb445a' }
  ];

  constructor(private router: Router,
    private toast: NotificationService,
    private slotsService: SlotsService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {
  }


}
