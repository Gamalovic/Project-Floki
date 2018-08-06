import { LoginPage } from './../login/login';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    this.navCtrl.push("LoginPage");
  }
  
  
}
