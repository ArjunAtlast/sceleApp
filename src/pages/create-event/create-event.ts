import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../api/event';
import { Skills, renderSkills } from '../../api/skills';

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  createEventForm: FormGroup;
  event: Event = new Event();
  targetSkills: Skills = new Skills();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {

    this.createEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      tagline: ['', Validators.maxLength(40)],
      website: ['', ],
      description: [''],
      place: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['']
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
