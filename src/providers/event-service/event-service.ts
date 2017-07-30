import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service/storage-service';
import { AuthService } from '../auth-service/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event, EventProps } from '../../api/event';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export const regExp = {
  website: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
}

@Injectable()
export class EventService {

  dbEvents = "/events";
  dbInterests = "/interests";

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private db: AngularFireDatabase
  ) {
  }

  createEvent(event: Event): Promise<string> {
    return new Promise((resolve, reject) => {
      if(this.auth.currentUser) { //authorized access
        //get unique event key
        event.owner = this.auth.currentUser.uid;
        let key = this.db.list(this.dbEvents).push(null).key;
        event.id = key;
        event.state = EventProps.state.ANNOUNCED;
        if(event.posterURL) {
          //upload poster image to storage if there is one.
          this.storage.uploadFile(event.posterURL, `/events/${key}`, 'poster.jpg').then((snapshot:any) => {
            event.posterURL = snapshot.downloadURL;
            return this.db.object(`${this.dbEvents}/${key}`).set(event);
            }).then(() => {

              resolve(key);
          }).catch(error => {
            reject(error);
          });
        }
        //if no poster image selected, just add event to database.
        else {
          this.db.object(`${this.dbEvents}/${key}`).set(event).then(() => {
            resolve(key);
          }).catch(error => {
            reject(error);
          });
        }
      }
      else {
        reject(new Error('Not Authorised'));
      }
    });

  }

  listLatestAnnounced(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      this.db.list(this.dbEvents,{
        query: {
          limitToLast: 20,
          orderByChild: 'createdAt'
        }
      }).subscribe((snapshot:Event[]) => {
        resolve(snapshot);
      }, error => {
        reject(error);
      });
    });
  }

  filterListOnSkills(list:any[], skills: string[]) {
    return list.filter((event:Event, index, array) => {
      return event.targetSkills.some((skill, index, array) => {
        return skills.indexOf(skill)!==-1;
      });
    });
  }

  getInterests(eventId: string) {
    let interestDb = this.db.list(`${this.dbInterests}/${eventId}`);
    return new Observable(observer => {
      interestDb.subscribe((snapshot:any[]) => {
        observer.next(snapshot);
      }, error => {
        observer.error(error);
      });
    });
  }

  addInterest(eventId: string): Promise<any> {
    let interestDb = this.db.list(`${this.dbInterests}/${eventId}`);
    return new Promise((resolve, reject) => {
      interestDb.push(this.auth.currentUser.uid).then(() => {
        resolve();
      }).catch(error => { reject(error)});
    });
  }

  removeInterest(eventId: string): Promise<any> {
    var key = null;
    let interestDb = this.db.list(`${this.dbInterests}/${eventId}`, {preserveSnapshot: true});
    return new Promise((resolve, reject) => {
      interestDb.subscribe(snapshots => {
        snapshots.forEach(snap => {
          //check if value exist or not
          if(snap.val()===this.auth.currentUser.uid) {
            key = snap.key;
          }
        });
        //remove item and resolve if value exists else reject
        if(key!=null) {
          interestDb.remove(key).then(() => {
            resolve();
          }).catch(error => { reject(error) });
        } else {
          reject(new Error('Cannot remove an item that doesnot exist'));
        }
      }, error => { reject(error); });
    });
  }

  isInterested(interestList: any[]) {
    return interestList.some((item, index, array) => {
      return item.$value === this.auth.currentUser.uid;
    });
  }

}
