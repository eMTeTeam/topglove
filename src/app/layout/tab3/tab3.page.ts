import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, WorkStations } from 'src/app/entities/topglove.domain.model';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  _factory: string[] = Factory.data;
  public factory: string = null;

  _workStations: string[] = WorkStations.data;
  public workStation: string = null;

  user: string = this.userService.User;

  from: string = moment().format('YYYY-MM-DD');
  to: string = moment().format('YYYY-MM-DD');

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
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    },
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
  public barChartData: ChartDataSets[] = [];

  public stackedBarChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{ stacked: true }], yAxes: [{ stacked: true }]
    },
  };

  public stackedBarChartLabels: Label[] = this._workStations;
  public stackedBarChartType: ChartType = 'horizontalBar';
  public stackedBarChartLegend = true;

  public stackedarChartData: ChartDataSets[] = [
    { data: [6, 8], label: 'Accepted', backgroundColor: '#2dd36f' },
    { data: [2, 4], label: 'Rejected', backgroundColor: '#eb445a' }
  ];

  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {
  }
  ionViewWillEnter() {
    this.loadData();
  }
  loadData = (event: any = null) => {

    if (event) {
      event.target.complete();
    }

    const f: Date = moment(this.from).toDate();
    const t: Date = moment(this.to).toDate();

    const payload = {
      'fromDate': new Date(this.from),
      'toDate': new Date(this.to),
      'factory': this.factory,
      'workStation': this.workStation
    }

    if (!this.userService.IsSuperUser) {
      payload['User'] = this.userService.User;
    }

    this.loadingService.show();
    this.apiService.loadAllEntity(payload).subscribe((result: Array<any>) => {
      this.resolveHeader(result);
      this.preparePieChart(result);
      this.prepareBarChart(result);
      this.prepareStackedBarChart(result);
      this.loadingService.hide();
    }, (error: any) => {
      this.loadingService.hide();
    });
  }

  resolveHeader = (result: Array<any>) => {
    this.total = result.length;

    this.accepted = result.filter(i => i['quality'] && i['quality'].toLowerCase() === 'accept').length;

    this.rejected = result.filter(i => i['quality'] && i['quality'].toLowerCase() === 'reject').length;
  }

  preparePieChart = (result: Array<any>) => {
    // let labels: Array<string> = result.map(i => i.defectDetails);
    var labels = result.map((value) => value.defectDetails).filter((value, index, _arr) => _arr.indexOf(value) == index);
    labels = labels.filter(i => i !== null && i !== undefined && i !== '');

    const data: Array<number> = [];

    labels.forEach(v => {
      const count = result.filter(i => i['defectDetails'] === v).length;
      data.push(count);
    });

    this.pieChartLabels = labels;
    this.pieChartData = data;

    this.colors = [{
      backgroundColor: ['#0074D9', '#FF4136', '#2ECC40', '#FF851B', '#7FDBFF', '#B10DC9', '#FFDC00', '#001f3f', '#39CCCC', '#01FF70', '#85144b']
    }];
  }

  prepareBarChart = (result: Array<any>) => {
    var uniqueDefects = result.map((value) => value.defectDetails).filter((value, index, _arr) => _arr.indexOf(value) == index);

    uniqueDefects = uniqueDefects.filter(i => i !== null && i !== undefined && i !== '');

    var uniqueFactories = result.map((value) => value.factory).filter((value, index, _arr) => _arr.indexOf(value) == index);
    uniqueFactories = uniqueFactories.filter(i => i !== null && i !== undefined && i !== '');
    this.barChartData = [];
    this.barChartLabels = [];
    var factoryWiseData = [];
    uniqueDefects.forEach((defect) => {
      factoryWiseData.push({ data: [], label: defect });
    })
    uniqueFactories.forEach((factory) => {
      this.barChartLabels.push(factory);
      factoryWiseData.forEach((value) => {
        var countData = result.filter(data => {
          return data.defectDetails === value.label && data.factory === factory;
        });
        value.data.push(countData.length);
      })
    })
    this.barChartData = factoryWiseData;
  }

  prepareStackedBarChart = (result: Array<any>) => {
    var uniqueUsers = result.map((value) => value.user).filter((value, index, _arr) => _arr.indexOf(value) == index);
    this.stackedBarChartLabels = [];
    var acceptedArray = [];
    var rejectedArray = [];
    uniqueUsers.forEach((value) => {
      var countDataAccepted = result.filter(data => {
        return data.quality == 'accept' && data.user == value;
      });
      var countDataRejected = result.filter(data => {
        return data.quality == 'reject' && data.user == value;
      });
      this.stackedBarChartLabels.push(value);
      acceptedArray.push(countDataAccepted.length);
      rejectedArray.push(countDataRejected.length);
      // var data={data:[countDataAccepted.length,countDataRejected.length], label:value};
      // this.barChartData.push(data);
    })
    this.stackedarChartData = [
      { data: acceptedArray, label: 'Accepted', backgroundColor: '#2dd36f' },
      { data: rejectedArray, label: 'Rejected', backgroundColor: '#eb445a' }
    ];
  }

  reset = () => {
    this.workStation = null;
    this.factory = null;
    this.from = moment().format('YYYY-MM-DD');
    this.to = moment().format('YYYY-MM-DD');

    this.loadData();
  }

}
