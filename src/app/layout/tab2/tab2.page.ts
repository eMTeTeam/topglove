import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { TopGlovEntity } from 'src/app/entities/topglove.model';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  list: Array<TopGlovEntity> = [];

  constructor(public modalController: ModalController,
    private router: Router,
    private apiService: ApiService,
    private notify: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService) {
  }

  ionViewWillEnter() {
    this.loadDate();
  }

  formatDateTime = (date: Date): string => {
    return moment(date).format('DD-MM-YYYY');
  }

  loadDate = (event: any = null) => {
    if (event) {
      event.target.complete();
    }

    const today: Date = moment().toDate();

    const payload = {
      "fromDate": today,
      "toDate": today
    }

    this.apiService.loadAllEntity(payload).subscribe((result: Array<any>) => {
      this.list = result;
    }, (error: any) => {

    });
  }

  openItem = (item: TopGlovEntity) => {
    this.router.navigateByUrl('/edit-entity', { state: { item } });
  }

}
