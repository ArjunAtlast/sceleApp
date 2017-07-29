import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService, regExp } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  resetPasswordForm: FormGroup;
  email: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, private auth: AuthService) {
    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(regExp.email)])]
    });
  }

  resetPwd() {
    this.auth.sendPasswordResetMail(this.email);
  }

  goBack() {
    this.navCtrl.pop();
  }

  showError(comp) {
    return comp.dirty && !comp.valid;
  }

}
