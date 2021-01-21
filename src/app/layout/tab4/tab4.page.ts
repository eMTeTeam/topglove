import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthCookie } from '../../services/auth-cookie-handler';
import { AppUpdatorService } from '../../services/app-updator.service';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
import { Previlages } from 'src/app/entities/previleges';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  previlages: Previlages = null;

  constructor(private router: Router,
    private apiService: ApiService,
    private authCookie: AuthCookie,
    private appUpdatorService: AppUpdatorService,
    private userService: UserService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadUSer();
  }

  loadUSer = () => {
    if (this.userService.previlages === null) {
      this.apiService.getMyPrevilige().subscribe((res: any) => {
        this.userService.previlages = res;
        this.previlages = this.userService.previlages;
      });
    } else {
      this.previlages = this.userService.previlages;
    }
  }

  checkForUpdate = () => {
    if (environment.production) {
      this.appUpdatorService.checkIfUpdateExist();
    }
  }

  logout = () => {
    this.apiService.logout();
    this.authCookie.deleteToken();
    this.router.navigate(['./login']);
  }

  openUserProfile = () => {
    this.router.navigate(['./user-profile']);
  }

  openAboutUs = () => {
    this.router.navigate(['./about-us']);
  }

  openSettings = () => {
    this.router.navigate(['./configuration']);
  }
}
