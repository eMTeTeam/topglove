import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private userService: UserService) {
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
    if (this.loginForm.dirty && this.loginForm.valid && this.loginForm.value.userName === 'user') {

      this.loadingService.show();

      this.userService.user = this.loginForm.value.userName;
      this.userService.IsSuperUser = true;

      this.loadingService.hide();

      this.router.navigate(['/tabs'], { replaceUrl: true });

    } else {
      // TODO: Toast for error message
    }
  }
}
