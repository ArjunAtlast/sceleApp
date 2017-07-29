import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user-service/user-service';
import { AuthService } from '../../providers/auth-service/auth-service';

import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: any;
  userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userSp: UserService,
    private auth: AuthService
  ) {
    this.userId = this.auth.currentUser.uid;
  }

  ionViewDidLoad() {
    this.userSp.onUserDetailsChanged(this.userId, snapshot => {
      this.user = snapshot;
    }, error => {
      console.log(error);
    });
  }

  editProfile() {
    this.navCtrl.push(EditProfilePage);
  }

}
