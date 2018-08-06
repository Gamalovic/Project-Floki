import { ipConfig } from './../../config';
import { Storage } from '@ionic/storage';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';

import { Http , RequestOptions,Headers} from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
    private storage:Storage,
    private localNotifications: LocalNotifications,
    private plt:Platform) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goSignup(){
    this.navCtrl.push("SignupPage");
  }
  goToChat(){
    this.navCtrl.push("ChatroomPage");
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
      this.navCtrl.push("ChatroomPage");
      this.storage.set("username",post.username);
      let result= response.json();
      let newResult=JSON.parse(result);
      this.plt.ready().then(()=>{
        this.notification(newResult.event);
      });
      this.storage.set("grade",newResult.userData[0].fields.year)
      
      
    },error=>{
      this.isCorrect=false;
    })

    
    
  }

  notification(events){
    for(let i=0;i<events.length;i++){
      let mydate = new Date(events[i].fields.date);
      let parts = events[i].fields.date.split('-');
      mydate = new Date(parts[0],parts[1]-1,parts[2]);
      if(events[i].fields.year == this.loginService.getGrade()){

        this.localNotifications.schedule({
          text: events[i].fields.name,
          trigger: {at: mydate},
          led: 'FF0000',
          sound:  "res://platform_default",
          actions: [
            { id: 'yes', title: 'OK' },
          ],
          smallIcon: 'res://calendar',
          badge:1,
          lockscreen:true,
          
        });

      }
    }
    this.localNotifications.schedule({
      text: 'Test Notification',
      trigger: {at: new Date(new Date().getTime() + 180000) },
      led: 'FF0000',
      sound:  "res://platform_default",
      actions: [
        { id: 'yes', title: 'OK' },
      ],
      smallIcon: 'res://calendar',
      badge:1,
      lockscreen:true,
      
    });
  }

}
