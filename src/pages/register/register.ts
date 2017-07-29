import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Skills, renderSkills } from '../../api/skills';
import { AuthService, regExp } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('registerSlider') registerSlider: any

  registerForm: FormGroup;
  showPassword: boolean;
  registerName: string;
  registerEmail: string;
  registerPassword: string;
  registerGender: string = 'male';
  registerSkills: Skills = new Skills();
  slideTwoActive: boolean = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
  ) {

    this.registerForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern(regExp.name)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(regExp.email)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });


  }

  register() {
    this.auth.register(
      this.registerEmail.trim(),
      this.registerPassword.trim(),
      this.registerName.trim(),
      this.registerGender,
      renderSkills(this.registerSkills)
    );
  }

  //go back
  goBack() {
    if(this.slideTwoActive) {
      this.registerSlider.lockSwipes(false);
      this.registerSlider.slidePrev();
      this.slideTwoActive = false;
      this.registerSlider.lockSwipes(true);
    }
    else this.navCtrl.pop();
  }

  //check whether to show error or not
  showError(comp) {
    return comp.dirty && !comp.valid;
  }

  nextPage() {
    this.registerSlider.lockSwipes(false);
    this.registerSlider.slideNext();
    this.slideTwoActive = true;
    this.registerSlider.lockSwipes(true);
  }

  //toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  setGenderMale() {
    this.registerGender = 'male';
  }
  setGenderFemale() {
    this.registerGender = 'female';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlider.lockSwipes(true);
    this.slideTwoActive = false;
  }

}
