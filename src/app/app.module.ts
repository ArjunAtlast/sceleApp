import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../providers/auth-service/auth-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { EventFeedsPage } from '../pages/event-feeds/event-feeds';
import { CreateEventPage } from '../pages/create-event/create-event';

import { UserService } from '../providers/user-service/user-service';
import { CameraService } from '../providers/camera-service/camera-service';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { StorageService } from '../providers/storage-service/storage-service';
import { UIService } from '../providers/ui-service/ui-service';

//custom components
import { EventCard } from '../components/event-card/event-card';
import { EventService } from '../providers/event-service/event-service';

const firebaseConfig = {
    apiKey: "AIzaSyDwtV_CXDvX36rxTVBFD6NT3IWxby7-hiA",
    authDomain: "simple-login-da7ed.firebaseapp.com",
    databaseURL: "https://simple-login-da7ed.firebaseio.com",
    projectId: "simple-login-da7ed",
    storageBucket: "simple-login-da7ed.appspot.com",
    messagingSenderId: "12860266549"
  };

@NgModule({
  declarations: [
    MyApp,
    EventCard,
    HomePage,
    MenuPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ProfilePage,
    EditProfilePage,
    EventFeedsPage,
    CreateEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ProfilePage,
    EditProfilePage,
    EventFeedsPage,
    CreateEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    UserService,
    Camera,
    Crop,
    CameraService,
    StorageService,
    UIService,
    EventService,
  ]
})
export class AppModule {}
