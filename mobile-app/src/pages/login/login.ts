import { LoginService } from './login.service';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom';

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
    private loginService:LoginService) {
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
    this.http.post("http://localhost:8000/apilogin/",JSON.stringify(post),options)
    // .subscribe(response=>{
    //   // console.log(response);
    //   // console.log("valid account");
    //   //console.log(JSON.stringify(formVal.value));
    //   //this.goToChat();
    // });
    .subscribe(()=>{
      this.navCtrl.push(ChatroomPage);
      this.AuthenticatedUser={username:post.username};
      this.isLogged=true;
      this.isCorrect=true;
      this.loginService.setUser(this.AuthenticatedUser,this.isLogged);
      console.log('done');
    },error=>{
      this.isCorrect=false;
    })
    
  }

  

}
