import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventCard } from '../../components/event-card/event-card';

import { Event, eventStates } from '../../api/event';
import { UserService } from '../../providers/user-service/user-service';

@Component({
  selector: 'page-event-feeds',
  templateUrl: 'event-feeds.html',
})
export class EventFeedsPage {

  //demo events
  events:Event[] = [
    {
      title: 'Demo Event',
      tagline: 'The best demo event ever!',
      //posterURL: 'assets/images/default_cover.jpg',
      place: 'Palakkad',
      startDate: '2017-08-02T14:00',
      endDate: '2017-08-02T14:00',
      description: 'This is a demo event',
      category: 'art',
      state: eventStates.STARTED,
      targetSkills: ['music','dance','acting'],
      tags: ['demo', 'mock'],
      owner: 'uEUHZruMPNh8MDhJm4OW2B04PhV2',
      createdAt: new Date().toISOString(),
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userSp: UserService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFeedsPage');
  }

  //get user name
  getUserDetail(userId:string):any {
    this.userSp.getUserDetailsAsync(userId).then(snapshot => {
      return {
        name: snapshot.name,
        photoURL: snapshot.photoURL || 'assets/images/avatar_man.svg'
      };
    }).catch(error => {
      return false;
    });
  }

  //get user

}
