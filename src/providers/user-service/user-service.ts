import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  dbPath = "/users";

  constructor( public db: AngularFireDatabase) {
  }

  getUserDetailsAsync(userId: string): Promise<any> {
    let userDbObject = this.db.object(`${this.dbPath}/${userId}`);
    return new Promise((resolve, reject) => {
      userDbObject.subscribe(snapshot => {
        if(snapshot && snapshot.$exists()) {
          resolve(snapshot);
        }
      }, error => {
        reject(error);
      });
    });
  }

  onUserDetailsChanged(userId:string ,next:(snapshot)=>void, error?:(error:any)=>void){
    let userDbObject = this.db.object(`${this.dbPath}/${userId}`);
    userDbObject.subscribe(snapshot => {
      next(snapshot);
    }, err => {
      if(error) error(err);
    });
  }

  setUserDetails(userId: string, details: any): Promise<any> {
    let userDbObject = this.db.object(`${this.dbPath}/${userId}`);
    return new Promise((resolve,reject) => {
      userDbObject.set(details).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  updateUserDetails(userId: string, details: any): Promise<any> {
    let userDbObject = this.db.object(`${this.dbPath}/${userId}`);
    return new Promise((resolve,reject) => {
      userDbObject.update(details).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }


  destroyRef(userId) {
    this.db.object(`${this.dbPath}/${userId}`).$ref.off();
  }

}
