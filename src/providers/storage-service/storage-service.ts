import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2'
import * as firebase from 'firebase/app';
import 'firebase/storage';

import { AuthService } from '../auth-service/auth-service';

import 'rxjs/add/operator/map';

@Injectable()
export class StorageService {
  storage: firebase.storage.Storage;
  user: firebase.User;

  constructor(private firebaseApp: FirebaseApp, private auth: AuthService) {
    console.log('Hello StorageService');

    this.storage = this.firebaseApp.storage();
    this.user = this.auth.currentUser;
  }

  uploadBlob(blob:any, path:string, filename:string): Promise<any> {
      return new Promise((resolve, reject) => {
        if(this.user) {
          path = (path.trim()[0]=='/' || path.trim().length==0)? path.trim() : `/${path.trim()}`;
          var fileRef = this.storage.ref(`${this.user.uid}${path}/${filename}`);
          var uploadTask = fileRef.put(blob);

          uploadTask.on('state_changed', snapshot=> {
            //Progress
          }, error => {
            reject(error);
          }, () => {
            //upload complete
            resolve(uploadTask.snapshot);
          });
        }
        else {
          reject(new Error('Not Authorized'));
        }
      });
  }

  uploadFile(input_path:string, reference_path:string, filename:string) {

    return new Promise((resolve, reject) => {
      this.toBlob(input_path).then(blob => {
        this.uploadBlob(blob, reference_path, filename).then(snapshot => {
          resolve(snapshot);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  toBlob(url: string) {
    return new Promise<string>(function (resolve) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function () {
          resolve(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    });
  }

}
