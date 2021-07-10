import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AppUpdatorService } from '../../services/app-updator.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private router: Router,
    private apiService: ApiService,
    private appUpdatorService: AppUpdatorService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  checkForUpdate = () => {
    if (environment.production) {
      this.appUpdatorService.checkIfUpdateExist();
    }
  }

  logout = () => {
    this.apiService.logout();
    this.router.navigate(['./login']);
  }
}
