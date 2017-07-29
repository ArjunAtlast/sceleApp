import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import * as firebase from 'firebase/app';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { EventFeedsPage } from '../event-feeds/event-feeds';

import { AuthService } from '../../providers/auth-service/auth-service';
import { UserService } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage: any = HomePage;
  homePage = HomePage;
  profilePage = ProfilePage;
  eventFeedsPage = EventFeedsPage;

  user: firebase.User;
  userDetail: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private auth: AuthService,
    private userSp: UserService,
  ) {
    this.user = auth.currentUser;
  }

  logout() {
    this.auth.logout();
  }

  openPage(p) {
    this.rootPage = p;
    this.menuCtrl.close();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.userSp.onUserDetailsChanged(this.user.uid, snapshot => {
      this.userDetail = snapshot;
    }, error => {
      console.log(error);
    });
  }

}
