import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../../api/event';
import { Skills, renderSkills, setAllSkills } from '../../api/skills';

import { EventService, regExp } from '../../providers/event-service/event-service';
import { CameraService } from '../../providers/camera-service/camera-service';
import { UIService } from '../../providers/ui-service/ui-service';

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  createEventForm: FormGroup;
  event: Event = new Event();
  targetSkills: Skills = new Skills();
  allSkills = false;
  minDate = new Date().toISOString();
  maxDate = new Date((new Date().getFullYear()+1).toString()).toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private cam: CameraService,
    private eventSp: EventService,
    private ui: UIService
  ) {

    this.createEventForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      tagline: ['', Validators.maxLength(40)],
      website: ['', Validators.pattern(regExp.website)],
      description: [''],
      place: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      tags: ['', Validators.pattern(/[a-zA-Z0-9,\-\s]/)]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  //check whether to show error text or not
  showError(comp): boolean {
    return comp.dirty && !comp.valid;
  }

  //select all skills
  selectAll(): void {
    setAllSkills(this.targetSkills, this.allSkills);
  }

  selectPosterCam(): void {
    this.cam.takePicture(1366, 768, 100).then((imagePath) => {
      this.event.posterURL = imagePath;
    });
  }

  selectPosterGallery(): void {
    //select poster from gallery
    this.cam.browsePicture(1366, 768).then((imagePath) => {
      this.event.posterURL = imagePath;
    });
  }

  createEvent() {
    this.ui.presentLoading();
    this.event.targetSkills = renderSkills(this.targetSkills);
    this.eventSp.createEvent(this.event).then(item => {
      this.ui.dismissLoading();
      this.navCtrl.pop();
    }).catch(error => {
      this.ui.showAlert("Event Creation Failed", error.message);
    });
  }

  //autofill target skills based on category
  fillTargetSkills() {
    setAllSkills(this.targetSkills, false);
    if(this.event.category === 'art') {
      this.targetSkills = {
        ...this.targetSkills,
        music: true,
        dance: true,
        acting: true,
        drawing: true,
        literature: true
      };
    }
    else if(this.event.category === 'sport') {
      this.targetSkills = {
        ...this.targetSkills,
        athletics: true,
        games: true,
        endurance: true,
        coordination: true
      };
    }
    else if(this.event.category === 'technical') {
      this.targetSkills = {
        ...this.targetSkills,
        designing: true,
        programming: true,
        data_analysis: true,
        technical_writing: true,
      };
    }
  }

}
