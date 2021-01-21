import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
import { Previlages } from 'src/app/entities/previleges';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.page.html',
  styleUrls: ['./group-details.page.scss'],
})
export class GroupDetailsPage implements OnInit {

  previlages: Previlages = null;
  user: User;
  group: any = {};

  constructor(private route: ActivatedRoute,
    private apiService: ApiService,
    private notify: NotificationService,
    private loadingService: LoadingService,
    public alertController: AlertController,
    private userService: UserService) {

    loadingService.show();
    const { group } = window.history.state;

    this.group = group;
    this.loadGroupDetails(group.teamId);

    this.user = userService.user;
    this.previlages = userService.previlages;
  }

  ngOnInit() {
  }

  loadGroupDetails = (id: string) => {
    this.apiService.getMemberList(id).subscribe(async res => {
      this.group.members = res;

      this.loadingService.hide();
    },
      err => {
        this.notify.error("Something Went wrong, Please try after sometime!");
        this.loadingService.hide();
      });
  }

  removeMember = async (member: any) => {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure want to remove this member?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => { }
      }, {
        text: 'Yes',
        handler: () => {
          this.remove(member);
        }
      }]
    });

    await alert.present();
  }

  remove = (member: any) => {
    this.apiService.removeMember(this.group.teamId, member.id).subscribe(res => {
      this.notify.success('Member removed successfully');
      this.loadGroupDetails(this.group.teamId);
    });
  }
}
