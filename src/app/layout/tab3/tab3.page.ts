import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { SlotsService } from '../../services/slots.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData,
  IPieChartOptions
} from 'chartist';

import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  today: string = moment().format("DD-MMM-YYYY");
  type: ChartType = 'Pie';
  data: IChartistData = {
    labels: ['Bananas', 'Apples', 'Grapes'],
    series: [20, 15, 40]
  };

  options: IPieChartOptions = {
    chartPadding: 30,
    labelOffset: 100,
    total: 100,
    startAngle: 0,
    donut: true,
    donutWidth: 60,
    labelInterpolationFnc: (value: any) => { return value }
  };

  constructor(private router: Router,
    private toast: NotificationService,
    private slotsService: SlotsService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {
  }


}
