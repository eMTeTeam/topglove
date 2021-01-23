import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, FiringOrRework, Size, TypeOfFormers, Defetcs } from 'src/app/entities/topglove.domain.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  serialNo: number = null;
  today: string = moment().format("DD-MMM-YYYY");
  formerType: string = null;
  size: string = null;
  factory: string = null;
  firingOrReWork: string = null;

  _typeOfFormers: string[] = TypeOfFormers.data;
  _factory: string[] = Factory.data;
  _firingOrRework: string[] = FiringOrRework.data;
  _Size: string[] = Size.data;
  _defetcs: string[] = Defetcs.data;

  constructor(private router: Router,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {
    this.serialNo = 1;
  }

  accept = () => {
    this.toast.success(`Serial no. ${this.serialNo} has been accepted!`);
    this.serialNo++;
  }

  reject = (type: string) => {
    this.toast.error(`Serial no. ${this.serialNo} has been rejected with ${type}!`);
    this.serialNo++;
  }

  validateForm = () => {
  }

  save = () => {

    this.apiService.saveEntity({}).subscribe((result: any) => {

    }, (error: any) => {

    });
  }

  loadRecentSerialNo = () => {
    this.apiService.loadRecentSerialNo().subscribe((result: any) => {

    }, (error: any) => {

    });
  }

}
