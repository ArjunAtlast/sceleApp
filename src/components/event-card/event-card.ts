import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../providers/user-service/user-service';
import { EventService } from '../../providers/event-service/event-service';
import { Event } from '../../api/event';

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCard {
  @Input() event: Event;
  detail: any;
  interests: any[];
  interestObserver: any;
  isInterested: boolean;

  constructor(
    private userSp: UserService,
    private eventSp: EventService
  ) {}

  getDetails(): void {
    this.userSp.getUserDetailsAsync(this.event.owner).then(snapshot => {
      this.detail = {
        name: snapshot.name,
        photoURL: snapshot.photoURL
      };
    }).catch(error => {
      console.log(error);
    });
  }

  getInterests() {
    this.interestObserver = this.eventSp.getInterests(this.event.id).subscribe((snapshot:any[]) => {
      this.interests = snapshot;
      this.isInterested = this.eventSp.isInterested(snapshot);
      console.log(this.isInterested);
      console.log(snapshot);
    }, error => {
      console.log(error);
    });
  }

  toggleInterest(): void {
    if(!this.isInterested) {
      this.isInterested = true;
      this.eventSp.addInterest(this.event.id).catch(error => {
        console.log(error);
      });
    }
    else {
      this.isInterested = false;
      this.eventSp.removeInterest(this.event.id).catch(error => {
         console.log(error);
      });
    }
  }

  ngOnInit(): void {
    this.getDetails();
    this.getInterests();
  }

  ngOnDestroy(): void {
    this.interestObserver.unsubscribe();
  }

}
