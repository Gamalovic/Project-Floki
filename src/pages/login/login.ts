import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom';
import { Http } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  username:string="";
  password;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http:Http) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goSignup(){
    this.navCtrl.push(SignupPage);
  }
  goToChat(){
    this.navCtrl.push(ChatroomPage);
  }

  createPost(formVal){
    // let post={
    //   username:this.username,
    //   password:this.password
    // }
     //this.http.post("https://jsonplaceholder.typicode.com/users",JSON.stringify(formVal.value))
    this.http.post("http://127.0.0.1:8000/friends/",JSON.stringify(formVal.value))
    .subscribe(response=>{
      console.log(response);
      console.log("valid account");
      console.log(JSON.stringify(formVal.value));
      this.goToChat();
    });
  }

}
