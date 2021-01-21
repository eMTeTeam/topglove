import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/entities/user';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user: User = null;

  constructor(private loadingService: LoadingService,
    private apiService: ApiService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadingService.show();
    this.loadMyDetails();
  }

  loadMyDetails = () => {
    if (this.userService.user === null) {
      this.apiService.getMyUserInfo().subscribe((res: any) => {
        this.user = res;
        this.userService.user = res;
        this.loadingService.hide();
      });
    } else {
      this.user = this.userService.user;
      this.loadingService.hide();
    }
  }

  editUser = () => {

  }

  dateFormat = (date: Date) => {
    return moment(date).format('DD-MM-YYYY');
  }

}
