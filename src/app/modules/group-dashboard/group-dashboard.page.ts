import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { GroupDashBoard, HealthMeasure } from 'src/app/entities/group-dashboard';
import { UserService } from 'src/app/services/user.service';
import { Previlages } from 'src/app/entities/previleges';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.page.html',
  styleUrls: ['./group-dashboard.page.scss'],
})
export class GroupDashboardPage implements OnInit {

  groupDashboardForm: FormGroup;

  groups: Array<any> = [];

  dashboardData: Array<GroupDashBoard>;

  previlages: Previlages;
  user: User;

  dummy: Array<any> = ['', ''];

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private userService: UserService) {
    this.generateDashboardForm();

    if (this.userService.user === null) {
      this.loaduser();
    } else {
      this.user = this.userService.user;
      this.loadPrevilages();
    }
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.generateDashboardForm();

    setTimeout(() => {
      this.loadGroups();
    }, 800);
  }

  generateDashboardForm = () => {
    this.groupDashboardForm = this.fb.group({
      date: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  loadGroups = () => {
    this.apiService.getGroups().subscribe((res: any) => {
      this.groups = res;
      this.restrictGroup();
    });
  }

  loaduser = () => {
    this.apiService.getMyUserInfo().subscribe((res: any) => {
      this.user = res;
      this.userService.user = res;

      this.loadPrevilages();
    });
  }

  loadPrevilages = () => {
    if (!this.userService.previlages) {
      this.apiService.getMyPrevilige().subscribe(res => {
        this.previlages = res;
        this.userService.previlages = res;

        this.restrictGroup();
      });
    } else {
      this.previlages = this.userService.previlages;

      this.restrictGroup();
    }
  }

  restrictGroup = () => {
    if (!this.previlages.canCreateTeam && this.groups && this.groups.length > 0) {
      const group = this.groups.find(i => i.teamId === this.user.teamId);
      this.groups = [group];
    }
  }

  loadDashboard = () => {

    if (this.groupDashboardForm.dirty && this.groupDashboardForm.valid) {
      const teamId = this.groupDashboardForm.value.group.teamId;
      const date = this.groupDashboardForm.value.date;

      const payload = {
        'TeamId': teamId,
        'DateTime': date
      };

      this.apiService.getDashboardReport(payload).subscribe((res: any) => {
        this.dashboardData = res;
      });
    }
  }

  resolveStatus = (measures: Array<HealthMeasure>): boolean => {
    let result = false;

    if (measures) {

      for (var i = 0; i < measures.length; ++i) {
        if (measures[i].temperatureUnit.toUpperCase() === 'C' && measures[i].temperature > 38) {
          result = true;
          return true;
        }

        if (measures[i].temperatureUnit.toUpperCase() === 'F' && measures[i].temperature > 99) {
          result = true;
          return true;
        }

      }
    }

    return result;
  }

}
