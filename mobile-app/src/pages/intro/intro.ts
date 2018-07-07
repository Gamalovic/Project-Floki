import { LoginPage } from './../login/login';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Slide } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})

export class IntroPage {
  @ViewChild('slides') slides:Slides;
  isHidden=true;
  micIsHidden=true;
  parIsHidden=true;
  loginParIsHidden=true;
  displayPage=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }
  ngOnInit(){
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    
  }
  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex==1){
      this.isHidden=false;
    }
    if(currentIndex==2){
      this.micIsHidden=false;      
    }
  }
  next(){
    this.navCtrl.push(LoginPage);
  }
  
  
}
