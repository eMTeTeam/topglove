import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';
import { AuthCookie } from '../../services/auth-cookie-handler';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private authCookie: AuthCookie,
    private notify: NotificationService,
    private loadingService: LoadingService,
    private userService: UserService) {
    this.generateLoginForm();
  }

  ngOnInit() {
    this.router.navigate(['/tabs'], { replaceUrl: true });
  }

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  doLogin = () => {
    this.router.navigate(['/tabs'], { replaceUrl: true });
    
    if (this.loginForm.dirty && this.loginForm.valid) {

      this.loadingService.show();

      const loginRequest = {
        email: this.loginForm.value.userName,
        password: this.loginForm.value.userPassword
      };

      this.apiService.doLogin(loginRequest).subscribe(async res => {

        this.loadingService.hide();

        const nowPlus10 = moment().add(10, 'days');
        const token = "Bearer " + res;
        this.authCookie.setToken(token, nowPlus10.toDate());
        this.router.navigate(['/tabs'], { replaceUrl: true });
        this.notify.success("Login successful");

        this.apiService.getMyUserInfo().subscribe(user => {
          this.userService.user = user;
        });
      },
        err => {
          this.notify.error("Login Failed, Please enter valid credentials!");
          this.loadingService.hide();
        });

    }
  }

  register = () => {
    this.router.navigate(['/register']);
  }
}
