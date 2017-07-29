import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService, regExp } from '../../providers/auth-service/auth-service';
import { UserService } from '../../providers/user-service/user-service';
import { CameraService } from '../../providers/camera-service/camera-service';
import { StorageService } from '../../providers/storage-service/storage-service';
import { UIService } from '../../providers/ui-service/ui-service';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user: any;
  profile: any = {
    name: "",
    photoURL: "assets/images/avatar_man.svg",
  };
  photoChanged: boolean = false;

  profileForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private userSp: UserService,
    private cam: CameraService,
    private storageSp: StorageService,
    private ui: UIService
  ) {
    this.profileForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(regExp.name)])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');

    this.userSp.getUserDetailsAsync(this.auth.currentUser.uid).then(user => {
      this.user = user;
      this.profile = this.fill(this.profile, user);
      console.log(this.profile);
    });

  }

  ionViewCanEnter(): boolean {
    if(this.auth.currentUser) {
      return true;
    }
    else {
      return false;
    }
  }

  takePicture() {
    this.cam.takeSquarePicture(320, 320, 100).then((imagePath) => {
      this.profile.photoURL = imagePath;
      this.photoChanged = true;
    });
  }

  browsePicture() {
    this.cam.browseSquarePicture(320, 320).then((imagePath) => {
      this.profile.photoURL = imagePath;
      this.photoChanged = true;
    });
  }

  confirmEdit() {
    this.ui.presentLoading();
    if(this.photoChanged) {
      let imgUrl = this.profile.photoURL;
      this.storageSp.uploadFile(imgUrl,'/profile','profile_photo.jpg').then((snapshot:any) => {
        this.profile.photoURL = snapshot.downloadURL;
        return this.userSp.updateUserDetails(this.auth.currentUser.uid, this.profile);
      }).then(() => {
        this.ui.dismissLoading();
        this.navCtrl.pop();
      }).catch(error => {
        this.ui.showAlert("Failed to update Profile", error.message);
      });
    }
    else {
      let tempProfile = Object.assign({}, this.profile);
      delete tempProfile.photoURL;
      this.userSp.updateUserDetails(this.auth.currentUser.uid, tempProfile).then(() => {
        this.ui.dismissLoading();
        this.navCtrl.pop();
      }).catch(error => {
        this.ui.showAlert("Failed to update Profile", error.message);
      });
    }
  }

  showError(comp) {
    return comp.dirty && !comp.valid;
  }

  private fill(a, b) {
    for(let x in a) {
      if(b.hasOwnProperty(x)) a[x] = b[x];
    }
    return a;
  }
}
