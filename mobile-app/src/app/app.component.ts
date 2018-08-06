import { Storage } from '@ionic/storage';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild('nav') nav : Nav;
  rootPage:string="IntroPage" ;
  showSplash=true;
  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage:Storage,
    private menuCtrl:MenuController) {

    this.storage.get("username").then(username=>{
      if(username){
        this.nav.setRoot("ChatroomPage");
      }
      else{
        this.nav.setRoot("IntroPage");
      }
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(1000).subscribe(()=>this.showSplash=false);
    });
    
  }


  initializeApp(){
    
  }

  logout(){
    this.storage.clear();
    this.menuCtrl.close();
    this.nav.setRoot(LoginPage);
  }

  
}

