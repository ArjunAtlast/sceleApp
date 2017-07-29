import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService, regExp } from '../../providers/auth-service/auth-service';

import { RegisterPage } from '../register/register';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  loginEmail: string;
  loginPassword: string;

  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
  ) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(regExp.email)])],
      password: ['', Validators.required]
    });
  }

  //login user
  login() {
    this.loginEmail = this.loginEmail.trim();
    this.auth.login(this.loginEmail, this.loginPassword);
  }

  //route to register page
  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  //Route to forgot password page
  forgotPwd() {
    this.navCtrl.push(ForgotPasswordPage);
  }

  //check whether to show error text or not
  showError(comp) {
    return comp.dirty && !comp.valid;
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

}
