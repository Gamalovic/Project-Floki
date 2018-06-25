import { ChatroomPage } from './../pages/chatroom/chatroom';
import { SignupPage } from './../pages/signup/signup';
import { LoginPage } from './../pages/login/login';
import { IntroPage } from './../pages/intro/intro';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { timer } from 'rxjs/observable/timer';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroPage;
  showSplash=true;
  constructor(public platform: Platform, public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(()=>this.showSplash=false);
    });
  }

  initializeApp(){
    
  }
}

