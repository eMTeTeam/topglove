import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EqualValidator } from '../../shared/directives/equal-validator.directive';
import { NotificationService } from '../../services/notification.service';
import { LoadingService } from '../../services/loading.service';
import { AuthCookie } from 'src/app/services/auth-cookie-handler';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  orgForm: FormGroup;

  userForm: FormGroup;

  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private notify: NotificationService,
    private loadingService: LoadingService,
    private authCookie: AuthCookie) {
    this.generateRegisterForm();
    authCookie.deleteToken();
  }

  ngOnInit() {
  }

  generateRegisterForm = () => {

    this.orgForm = this.fb.group({
      orgName: ['', Validators.required],
      userName: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    }, {
      validators: EqualValidator('password', 'cPassword')
    });

  }

  get of() { return this.orgForm.controls; }

  doRegister = () => {
    if (this.orgForm.dirty && this.orgForm.valid) {
      this.loadingService.show();

      const orgRegister = {
        organizationName: this.orgForm.value.orgName,
        userName: this.orgForm.value.userName,
        email: this.orgForm.value.emailId,
        password: this.orgForm.value.password,
        confirmPassword: this.orgForm.value.cPassword
      }

      this.apiService.doRegister(orgRegister).subscribe(async res => {
        this.loadingService.hide();
        this.router.navigate([''], { replaceUrl: true });
      },
        err => {
          this.notify.error("Huh! Sorry, Registration failed. Try with differnt names.");
          this.loadingService.hide();
        });
    }

  }

}
