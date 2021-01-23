import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { Users } from 'src/app/entities/topglove.domain.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  users: Array<string> = Users.data;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService,
    private toast: NotificationService) {
    this.generateLoginForm();
  }

  ngOnInit() {
  }

  generateLoginForm = () => {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }

  doLogin = () => {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const user: string = this.loginForm.value.userName.toLowerCase();
      if (this.users.includes(user)) {
        this.loadingService.show();
        this.userService.user = this.loginForm.value.userName;

        if (user === 'test') {
          this.userService.IsSuperUser = true;
        }

        this.loadingService.hide();
        this.router.navigate(['/tabs'], { replaceUrl: true });
      } else {
        this.toast.error("Please enter valid user name");
      }
    }
  }
}
