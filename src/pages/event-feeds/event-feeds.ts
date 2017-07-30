import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventCard } from '../../components/event-card/event-card';

import { Event } from '../../api/event';
import { EventService } from '../../providers/event-service/event-service';
import { UIService } from '../../providers/ui-service/ui-service';

@Component({
  selector: 'page-event-feeds',
  templateUrl: 'event-feeds.html',
})
export class EventFeedsPage {

  //demo events
  events:Event[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventSp: EventService,
    private ui: UIService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFeedsPage');
    this.getEventFeeds();
  }

  getEventFeeds() {
    this.ui.presentLoading();
    this.eventSp.listLatestAnnounced().then(snapshot => {
      this.events = snapshot;
      this.ui.dismissLoading();
    });
  }

}
