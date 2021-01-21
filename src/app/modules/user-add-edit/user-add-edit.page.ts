import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { NotificationService } from '../../services/notification.service';
import { AuthCookie } from '../../services/auth-cookie-handler';
import { Countries, Country } from '../../entities/countries';
import { EqualValidator } from 'src/app/shared/directives/equal-validator.directive';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.page.html',
  styleUrls: ['./user-add-edit.page.scss'],
})
export class UserAddEditPage implements OnInit {

  nationalities: Array<Country> = Countries.list;

  groupId: string = '';
  userId: string = '';

  isNew: boolean = false;

  userForm: FormGroup;

  groupName: string;
  orgName: string;

  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private notify: NotificationService,
    private authCookie: AuthCookie,
    public alertController: AlertController) {
    this.loadParams();
  }

  ngOnInit() {
  }

  loadParams = () => {

    this.route.queryParams.subscribe(params => {
      this.groupId = params.groupId;
      this.userId = params.userId;
      if (this.userId) {
        this.isNew = false;
        this.loadUserFromApi();
      }
      else {
        this.isNew = true;
        this.generateUserForm();
        this.loadMoreInformation(this.groupId);
      }
    });
  }

  loadMoreInformation = (groupId: string) => {
    this.apiService.loadGroupInfo(groupId).subscribe(res => {
      this.groupName = res.teamName;
      this.orgName = res.organizationName;
    });
  }

  get of() { return this.userForm.controls; }

  generateUserForm = () => { // load for new user the default value or load from api
    this.userForm = this.fb.group({
      emailId: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      displayPicture: [''],
      address: [''],
      phoneNumber: ['', Validators.required],
      nationality: [''],
      roleDescription: [''],
      infected: [false],
      fromDate: [''],
      toDate: [''],
    }, {
      validators: EqualValidator('password', 'cPassword')
    });
  }

  loadUserFromApi = () => {
  }

  saveUser = () => {
    if (this.userForm.dirty && this.userForm.valid) {
      // save and goto previous screen
      // first time then goto Home
      const userParams = {
        'name': this.userForm.value.name,
        'password': this.userForm.value.password,
        'email': this.userForm.value.emailId,
        'isOrganizationAdmin': false,
        'teamId': this.groupId,
        'dateOfBirth': this.userForm.value.dateOfBirth,
        'displayPicture': null,
        'address': this.userForm.value.address,
        'phoneNumber': this.userForm.value.phoneNumber + '',
        'nationality': this.userForm.value.nationality.name,
        'roleDescription': this.userForm.value.roleDescription
      };

      this.authCookie.deleteToken();

      this.apiService.addMemberToTeam(userParams).subscribe(async res => {
        // this.notify.success("Yeah! you are signed up with the team!");
        this.loadingService.hide();
        this.showSuccessAlert();
      },
        err => {
          this.notify.error("Something Went wrong, Please try after sometime!");
          this.loadingService.hide();
        });

    }
  }

  showSuccessAlert = async () => {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Yeah! you are signed up with ' + this.orgName,
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: () => {
          this.router.navigate(['./login']);
        }
      }]
    });

    await alert.present();
  }

}
