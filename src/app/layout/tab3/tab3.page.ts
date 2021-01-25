import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, Users, FiringOrRework, Size, TypeOfFormers, Defetcs } from 'src/app/entities/topglove.domain.model';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

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

  accepted: number = 0;
  rejected: number = 0;
  total: number = 0;

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public colors: Color[] = [];

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
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {
    this.loadData();
  }

  loadData = (event: any = null) => {

    if (event) {
      event.target.complete();
    }

    const f: Date = moment(this.from).toDate();
    const t: Date = moment(this.to).toDate();

    const payload = {
      "fromDate": new Date(this.from),
      "toDate": new Date(this.to),
      "factory": this.factory
    }

    this.apiService.loadAllEntity(payload).subscribe((result: Array<any>) => {
      this.resolveHeader(result);
      this.preparePieChart(result);
      this.prepareBarChart(result);
      this.prepareStackedBarChart(result);
    }, (error: any) => {

    });
  }

  resolveHeader = (result: Array<any>) => {
    this.total = result.length;

    this.accepted = result.filter(i => i['quality'] && i['quality'].toLowerCase() === 'accept').length;

    this.rejected = result.filter(i => i['quality'] && i['quality'].toLowerCase() === 'reject').length;
  }

  preparePieChart = (result: Array<any>) => {
    let labels: Array<string> = result.map(i => i.defectDetails);
    labels = labels.filter(i => i !== null && i !== undefined && i !== '');

    const data: Array<number> = [];

    labels.forEach(v => {
      const count = result.filter(i => i['defectDetails'] === v).length;
      data.push(count);
    });

    this.pieChartLabels = labels;
    this.pieChartData = data;

    this.colors = [{
      backgroundColor:["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b"]
    }];
  }

  prepareBarChart = (result: Array<any>) => {

  }

  prepareStackedBarChart = (result: Array<any>) => {

  }

}
