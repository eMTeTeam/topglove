import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { Plugins } from '@capacitor/core';
import { UserService } from 'src/app/services/user.service';

const { Share, Clipboard } = Plugins;

const navigator = (window.navigator as any);

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  groups: Array<any> = [];

  constructor(public modalController: ModalController,
    private router: Router,
    private apiService: ApiService,
    private notify: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService) {


    // this.user = this.userService.user;
    // if (!this.userService.previlages) {
    //   this.apiService.getMyPrevilige().subscribe(res => {
    //     this.previlages = res;
    //     this.userService.previlages = res;
    //   });
    // } else {
    //   this.previlages = this.userService.previlages;
    // }
  }

  ionViewWillEnter() {
    // this.loadGroups();
  }

  loadGroups = (event: any = null) => {
    this.loadingService.show();

    if (event) {
      event.target.complete();
    }

    this.apiService.getGroups().subscribe(async res => {
      this.groups = res;
      this.loadingService.hide();


    },
      err => {
        this.notify.error("Please try after sometime!");
        this.loadingService.hide();
      });
  }

  addGroup = async () => {
    this.router.navigate(['/new-group']);
  }

  openGroup = (group: any) => {
    this.router.navigateByUrl('/group-details', { state: { group } });
  }

  shareGroup = async ($event: any, group: any) => {
    event.stopImmediatePropagation();

    const url = location.origin + '/#/user-add-edit?groupId=' + group.teamId; //TODO:: take base url

    const options = {
      title: 'Health Tracker',
      url: url,
      dialogTitle: 'Share with team'
    };

    if (navigator.share) {
      await Share.share(options);
    } else {
      Clipboard.write({
        string: url,
        url: location.origin
      });

      this.notify.success('Sharing url is copied.');
    }
  }

}
