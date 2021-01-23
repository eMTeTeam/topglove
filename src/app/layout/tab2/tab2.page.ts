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

  loadDate = () => {
    this.list = [
      {
        SerialNo: 1,
        Accept: true,
        Date: moment().toDate(),
        DefectType: null,
        Factory: 'F01',
        FiringType: null,
        Former: 'GPT',
        Size: 'XS',
        User: 'user 1'
      },
      {
        SerialNo: 1,
        Accept: false,
        Date: moment().toDate(),
        DefectType: 'Pinhole',
        Factory: 'F01',
        FiringType: 'Rework',
        Former: 'GPT',
        Size: 'XS',
        User: 'user 1'
      }
    ]
  }

  openItem = (item: TopGlovEntity) => {
    this.router.navigateByUrl('/edit-entity', { state: { item } });
  }

}
