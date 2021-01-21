import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Previlages } from 'src/app/entities/previleges';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  previlages: Previlages = null;

  constructor(private router: Router,
    private userService: UserService,
    private apiService: ApiService) {
    this.openDefaultTab();
  }


  ionViewWillEnter() {
    this.loadPrevilages();
  }

  loadPrevilages = () => {
    if (!this.userService.previlages) {
      this.apiService.getMyPrevilige().subscribe(res => {
        this.previlages = res;
        this.userService.previlages = res;
      });
    } else {
      this.previlages = this.userService.previlages;
    }
  }

  openDefaultTab = () => {
    this.router.navigate([`./tabs/tab3/group-dashboard`]);
  }

  clickTab = (event: Event, tab: string) => {
    event.stopImmediatePropagation();

    this.router.navigate([`./tabs/tab3/${tab}`]);
  }

}
