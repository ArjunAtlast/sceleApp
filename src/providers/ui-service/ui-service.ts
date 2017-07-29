import { Injectable } from '@angular/core';
import { LoadingController, AlertController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the UiServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UIService {
  loading: Loading;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    console.log('Hello UiServiceProvider Provider');
  }

  /**
  * @summary show loading
  */
  presentLoading(content='Please wait...') {
    this.loading = this.loadingCtrl.create({
      content: content
    });

    this.loading.present();
  }

  /**
  * @summary show alert box
  */
  showAlert(title:string, text: string) {
    if(this.loading) this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  dismissLoading() {
    if(this.loading) this.loading.dismiss();
  }

}
