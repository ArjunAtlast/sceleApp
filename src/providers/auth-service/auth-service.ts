import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../user-service/user-service';
import { UIService } from '../ui-service/ui-service';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const regExp = {
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  name: /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/
};

@Injectable()
export class AuthService {


  currentUser: firebase.User;
  dbPath = '/users';

  constructor(public afAuth: AngularFireAuth, public userSp: UserService, public ui: UIService) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });

  }

  /**
  * @summary get a user asynchronously
  */
  getUserAsync(): Promise<firebase.User> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if(user) {
          resolve(user);
        }
      });
    });
  }

  observeUser():Observable<firebase.User>  {
      return new Observable( observer => {
        setTimeout(() => {
          if(this.afAuth.auth.currentUser) {
            observer.next(this.afAuth.auth.currentUser);
          }
          else {
            observer.complete();
          }
        }, 200);
      });
  }

  /**
  * @summary login a user
  */
  login(email: string, password: string): void {

    this.ui.presentLoading();
    //Login
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.ui.dismissLoading();
    }).catch(error => {
      this.ui.showAlert('Login Failed:', error.message);
    });

  }

  /**
  * @summary register a new user
  */
  register(email: string, password: string, name: string, gender: string, skills: any): void {
    this.ui.presentLoading();
    if(email.match(regExp.email) && password.length > 0 && name.match(regExp.name) && name.length >= 3) {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
        //update display name
        //console.log(user.uid);
        this.ui.loading.setContent("Generating Profile..");
        //create database
        this.userSp.setUserDetails(user.uid, {
          name: name,
          email: email,
          gender: gender,
          skills: skills,
        }).then(() => {
          //send verification mail
          this.ui.loading.setContent("Sending verification mail ...")
          user.sendEmailVerification().then(() => {
            this.ui.dismissLoading();
          }).catch(error => {
            this.ui.showAlert("Couldn't Send Mail", error.message);
          });

        }).catch(error => {
          this.ui.showAlert("Profile Creation Failed:", error.message);
        });

      }).catch(error => {
        this.ui.showAlert("User Registration Failed:", error.message);
      });

    }

    else {
      this.ui.showAlert("User Registraion Failed:","Invalid Credentials")
    }
  }

  /**
  * @summary sends user a verification mail
  */
  resendVerificationMail() {
    this.ui.presentLoading(`Sending Mail ...`);
    if(this.currentUser) {
      this.currentUser.sendEmailVerification().then(() => {
        this.ui.showAlert("Mail Send", `Verification mail has been send to ${this.currentUser.email}`);
      }).catch(error => {
        this.ui.showAlert("Couldn't Send Mail", error.message);
      });
    }
  }

  /**
  * @summary sends a password reset mail
  */
  sendPasswordResetMail(email) {
    this.ui.presentLoading('Processing Request..');
    if(email.match(regExp.email)) {
      this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
        this.ui.showAlert("Success", `A link to reset the password has been send to ${email}`);
      }).catch(error => {
        this.ui.showAlert("Failed", error.message);
      });
    }
    else {
      this.ui.showAlert("Failed", "Invalid mail");
    }
  }

  /**
  * @summary logs out current user
  */
  logout(): void {
    this.ui.presentLoading();
    this.userSp.destroyRef(this.currentUser.uid);
    this.afAuth.auth.signOut().then(() => {
      this.ui.dismissLoading();
    }).catch(error => {
      this.ui.showAlert("Logout Failed:", error.message);
    });
  }


}
