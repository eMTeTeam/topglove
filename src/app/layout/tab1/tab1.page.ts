import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from '../../services/api.service';
import { UserService } from 'src/app/services/user.service';
import { Factory, FiringOrRework, Size, TypeOfFormers, Defetcs, Shifts }
  from 'src/app/entities/topglove.domain.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  serialNo: number = null;
  formerType: string = null;
  qualityDate: Date = null;
  size: string = null;
  factory: string = null;
  firingOrReWork: string = null;
  shift: string = null;

  _typeOfFormers: string[] = TypeOfFormers.data;
  _factory: string[] = Factory.data;
  _firingOrRework: string[] = FiringOrRework.data;
  _Size: string[] = Size.data;
  _defetcs: string[] = Defetcs.data;
  _shitfs: string[] = Shifts.data;

  constructor(private toast: NotificationService,
    private loadingService: LoadingService,
    private apiService: ApiService,
    public userService: UserService) {

  }

  ionViewWillEnter() {
    this.loadRecentSerialNo();
  }
  accept = () => {
    if (this.validateForm()) {
      this.loadingService.show();

      const payload = {
        'serialNumber': this.serialNo,
        'user': this.userService.User,
        'workStation': this.userService.WorkStation,
        'typeOfFormer': this.formerType,
        'factory': this.factory,
        'firingOrRework': this.firingOrReWork,
        'size': this.size,
        'defectDetails': '',
        'quality': 'accept',
        'createdDateTime': this.qualityDate,
        'shift': this.shift
      };

      const message: string = `Serial no. ${this.serialNo} has been accepted!`;

      this.save(payload, message);
    } else {
      this.toast.info('Please select valid data.');
    }
  }

  reject = (type: string) => {
    if (this.validateForm()) {
      this.loadingService.show();

      const payload = {
        'serialNumber': this.serialNo,
        'user': this.userService.User,
        'workStation': this.userService.WorkStation,
        'typeOfFormer': this.formerType,
        'factory': this.factory,
        'firingOrRework': this.firingOrReWork,
        'size': this.size,
        'defectDetails': type,
        'quality': 'reject',
        'createdDateTime': this.qualityDate,
        'shift': this.shift
      };

      const message: string = `Serial no. ${this.serialNo} has been rejected with defect details ${type}!`;

      this.save(payload, message);
    }
    else {
      this.toast.info('Please select valid data.');
    }
  }

  validateForm = (): boolean => {
    return (this.formerType !== null && this.size !== null && this.factory !== null && this.qualityDate !== null);
  }

  save = (payload: any, message: string) => {
    this.apiService.insertEntity(payload).subscribe((result: any) => {
      this.loadingService.hide();

      if (result) {
        this.serialNo = result['serialNumber'] + 1;
        this.toast.success(message);
      } else {
        // todo alert
      }
    }, (error: any) => {
      this.loadingService.hide();

      // todo alert
    });
  }

  loadRecentSerialNo = (event: any = null) => {
    this.loadingService.show();

    if (event) {
      event.target.complete();
      this.loadingService.hide();
    }

    this.apiService.loadRecentSerialNo(this.userService.User).subscribe((result: any) => {
      this.loadingService.hide();
      this.serialNo = result + 1;
    }, (error: any) => {
      this.loadingService.hide();

      // todo alert
    });
  }

}
