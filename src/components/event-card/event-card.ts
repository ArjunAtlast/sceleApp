import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../providers/user-service/user-service';
import { Event } from '../../api/event';

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCard {
  @Input() event: Event;
  detail: any;

  constructor(private userSp: UserService) {}

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

  ngOnInit(): void {
    this.getDetails();
  }
}
