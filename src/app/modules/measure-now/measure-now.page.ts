import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SlotsService } from '../../services/slots.service';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import * as moment from 'moment';
import { Events } from 'src/app/services/events';

@Component({
  selector: 'app-measure-now',
  templateUrl: './measure-now.page.html',
  styleUrls: ['./measure-now.page.scss'],
})
export class MeasureNowPage implements OnInit {

  slotEvent: string = 'slot:created';

  selectNone: boolean = true;

  difficultBreathing: boolean = false;
  cough: boolean = false;
  cold: boolean = false; // api mapping RunnyNose
  soreThroat: boolean = false; // api mapping Sneezing

  temprature: number;
  celciusOrFarenheat: string = 'C';

  constructor(private router: Router,
    public slotsService: SlotsService,
    public apiService: ApiService,
    public notify: NotificationService,
    private loadingService: LoadingService,
    private events: Events) {
  }

  ngOnInit() {
    // this.temprature = 97.5;
    this.temprature = 36.4;
  }

  onSelectNone = (checked: boolean) => {
    if (checked) {
      this.difficultBreathing = false;
      this.cough = false;
      this.cold = false;
      this.soreThroat = false;
    }
  }

  clearNone = (checked: boolean) => {
    if (checked) {
      this.selectNone = false;
    }
  }

  save = () => {

    const params = {
      "NotedDate": moment.utc(),
      "Intime": "9:00 AM",
      "OutTime": "6:00 PM",
      "CreateHealthMeasure": {
        "Temperature": this.temprature,
        "TemperatureUnit": this.celciusOrFarenheat,
        "SlotNumber": this.slotsService.count,
        "updateDateTime": moment.utc(),
        "Cough": this.cough,
        "Sneezing": this.soreThroat,
        "RunnyNose": this.cold,
        "ShortnessBreath": this.difficultBreathing
      }
    }

    if (this.slotsService.count > 1) {
      params['Id'] = this.slotsService.id;
    }

    this.loadingService.show();

    this.apiService.saveTempratureSlot(params).subscribe(async res => {
      this.notify.success("Thank You!, Added your health details!");
      this.loadingService.hide();

      this.events.publish(this.slotEvent);

      this.router.navigate(['./'], { replaceUrl: true });
    },
      err => {
        this.notify.error("Huh!, Something went wrong");
        this.loadingService.hide();
      });
  }

}
