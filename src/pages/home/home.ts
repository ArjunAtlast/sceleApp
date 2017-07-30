import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { AuthService } from '../../providers/auth-service/auth-service';
import { UserService } from '../../providers/user-service/user-service';
import { UIService } from '../../providers/ui-service/ui-service';

import { CreateEventPage } from '../create-event/create-event';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: firebase.User;
  userDetail: any;
  userSubscription:any;

  constructor(
    public navCtrl: NavController,
    private auth: AuthService,
    private userSp: UserService,
    private ui: UIService
  ) {

  }

  ionViewDidLoad() {
    //get user detail
    this.ui.presentLoading();
    this.auth.getUserAsync().then(user => {
      this.user = user;
      return this.userSp.getUserDetailsAsync(user.uid)
    }).then(detail => {
      this.userDetail = detail;
      this.ui.dismissLoading();
    }).catch(error => {
      this.ui.showAlert("Failed to fetch user", error.message);
    });
  }

  createEvent() {
    this.navCtrl.push(CreateEventPage);
  }

  resendVerifMail() {
    this.auth.resendVerificationMail();
  }

}
