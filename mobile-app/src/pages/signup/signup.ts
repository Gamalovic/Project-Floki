import { LoginPage } from './../login/login';
import { ChatroomPage } from './../chatroom/chatroom';
import { Http , RequestOptions,Headers} from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams , 
    private http:Http,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goLogin(){
    this.navCtrl.pop();
  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Registration Successful',
      subTitle: 'Just login with your username and password',
      buttons: ['ok']
    });
    alert.present();
  }

  createPost(fn,ln,un,pwd,year){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let post={
      username:un.value,
      first_name:fn.value,
      last_name:ln.value,
      year:year.value,
      password:pwd.value
      
    }
    
    console.log(post)
    console.log(year.value)
    // this.http.post("https://jsonplaceholder.typicode.com/users",JSON.stringify(post))
    this.http.post("http://127.0.0.1:8000/apireg/",JSON.stringify(post),options)

    .subscribe(()=>{
      this.navCtrl.push(LoginPage);
      this.presentAlert();
    },error=>{
      console.log(JSON.stringify(post));
      console.log("this is the error  "+error);
    })
  }
}
