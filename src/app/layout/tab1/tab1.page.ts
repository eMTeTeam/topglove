import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { SlotTime } from '../../entities/measure-card';
import { SlotsService } from '../../services/slots.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { Events } from 'src/app/services/events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slotEvent: string = 'slot:created';
  eventSubscription: Subscription;

  today: string = moment().format('DD MMM YYYY');
  enableSaveTime: boolean = false;

  startDate: Date;
  endDate: Date;
  slots: Array<SlotTime> = [];

  customStartPickerOptions: any = {
    buttons: [{
      text: 'Done',
      handler: (time: any) => this.selectStartDay(time)
    }]
  };

  customEndPickerOptions: any = {
    buttons: [{
      text: 'Done',
      handler: (time: any) => this.selectEndDay(time)
    }]
  };

  constructor(private router: Router,
    private toast: NotificationService,
    private slotsService: SlotsService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    private events: Events) {
  }

  ionViewWillEnter() {
    // this.load();
  }

  load = (event: any = null) => {

    if (event) {
      event.target.complete();
    }

    this.loadingService.show();

    this.loadTodayTiming();
    this.loadTodaySlots();

    setTimeout(() => {
      this.loadingService.hide();
    }, 1500);
  }

  loadTodayTiming = () => {
    this.startDate = moment().toDate();
    this.endDate = moment().toDate();
  }

  loadTodaySlots = () => {
    var currentDate = moment().format('YYYY-MM-DD')
    this.apiService.getTodaySlotInfo(currentDate).subscribe((res: any) => {
      if (res) {
        this.slots = res.healthMeasures;
        this.slotsService.id = res.id;

        this.slotsService.count = this.slots.length + 1;
      } else {
        this.slotsService.count = 1;
      }
    });
  }

  addTemprature = () => {
    this.eventSubscription = this.events.subscribe(this.slotEvent, () => {
      this.load();
      this.unSubscribe();
    });

    this.router.navigate(['./measure-now']);
  }

  unSubscribe = () => {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  toggleSaveTiming = () => {
    this.enableSaveTime = !this.enableSaveTime;
  }

  saveTimings = () => {
    this.toggleSaveTiming();

  }

  formatTime = (date: Date): string => {
    return moment(date).format('HH:mm A');
  }

  selectStartDay = (time: any) => {
    // const ampm = time.ampm.value;
    const hour = time.hour.value;
    const minute = time.minute.value;

    this.startDate = moment()
      .set('hour', hour)
      .set('minute', minute)
      .toDate();
  }

  selectEndDay = (time: any) => {
    // const ampm = time.ampm.value;
    const hour = time.hour.value;
    const minute = time.minute.value;

    this.endDate = moment()
      .set('hour', hour)
      .set('minute', minute)
      .toDate();
  }
}
