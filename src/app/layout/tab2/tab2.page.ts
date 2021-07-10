import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TopGlovEntity } from 'src/app/entities/topglove.model';
import * as moment from 'moment';
import { Factory, WorkStations } from 'src/app/entities/topglove.domain.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  _factory: string[] = Factory.data;
  public factory: string = null;

  _workStations: string[] = WorkStations.data;
  public workStation: string = null;

  user: string = this.userService.User;

  list: Array<TopGlovEntity> = [];

  constructor(public modalController: ModalController,
    private router: Router,
    private apiService: ApiService,
    private toast: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService) {
  }

  ionViewWillEnter() {
    this.loadDate();
  }

  formatDateTime = (date: Date): string => {
    return moment(date).format('DD-MM-YYYY');
  }
  from: string = moment().format("YYYY-MM-DD");
  to: string = moment().format("YYYY-MM-DD");
  loadDate = (event: any = null) => {

    if (event) {
      event.target.complete();
    }

    const payload = {
      "fromDate": new Date(this.from),
      "toDate": new Date(this.to),
    }

    if (!this.userService.IsSuperUser) {
      payload["User"] = this.userService.User;
    }

    this.loadingService.show();
    this.apiService.loadAllEntity(payload).subscribe((result: Array<any>) => {
      // this.list=result;
      this.list = this.json2array(this.groupBy(result, "user"));
      this.loadingService.hide();
    }, (error: any) => {
      this.loadingService.hide();
    });
  }

  openItem = (item: TopGlovEntity) => {
    this.router.navigateByUrl('/edit-entity', { state: { item } });
  }

  groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, []);
  };

  json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push({
        key: key, data: json[key].sort(function (a, b) {
          return a.serialNumber - b.serialNumber;
        })
      });
    });
    return result;
  };

}
