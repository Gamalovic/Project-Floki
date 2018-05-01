import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  firstname;
  lastname;
  password;
  contrast;
  username;
  constructor(public navCtrl: NavController, public navParams: NavParams , private http:Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goLogin(){
    this.navCtrl.pop();

  }

  createPost(){
    let post={
      firstname:this.firstname,
      lastname:this.lastname,
      username:this.username,
      password:this.password,
      contrast:this.contrast
    }
    // this.http.post("https://jsonplaceholder.typicode.com/users",JSON.stringify(post))
    this.http.post("http://127.0.0.1:8000/data",JSON.stringify(post))

    .subscribe(response=>{
      console.log(this.contrast);
      console.log(response);
    })
  }
}
