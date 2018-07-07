import { ipConfig } from './../../config';
import { ChatroomPage } from './../chatroom/chatroom';
import { Storage } from '@ionic/storage';
import { LoginService } from './login.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http , RequestOptions,Headers} from '@angular/http';


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

  AuthenticatedUser={};
  isLogged=false;
  isCorrect=true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http:Http,
    private loginService:LoginService,
    private storage:Storage) {
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

  createPost(un,psw){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

    let post={
      username:un.value,
      password:psw.value
    }
     //this.http.post("https://jsonplaceholder.typicode.com/users",JSON.stringify(formVal.value))
    console.log(post)
    this.http.post(ipConfig.ip + "apilogin/",JSON.stringify(post),options)
    // .subscribe(response=>{
    //   // console.log(response);
    //   // console.log("valid account");
    //   //console.log(JSON.stringify(formVal.value));
    //   //this.goToChat();
    // });
    .subscribe((response)=>{
      this.navCtrl.push(ChatroomPage);
      this.storage.set("username",post.username);
      let result= response.json();
      let newResult=JSON.parse(result);
      this.loginService.setEvents(newResult);
      console.log(newResult);
    },error=>{
      this.isCorrect=false;
    })
    
  }

  

}
