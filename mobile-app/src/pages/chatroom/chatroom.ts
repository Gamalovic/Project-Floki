import { LoginService } from './../login/login.service';
import { LoginPage } from './../login/login';
import { ipConfig } from './../../config';
import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { Storage } from'@ionic/storage';
import { SpeechRecognition} from '@ionic-native/speech-recognition'
import { Http , RequestOptions , Headers} from '@angular/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})

export class ChatroomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('isbot') elem:ElementRef;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    private speech:SpeechRecognition,
    private http:Http,
    private localNotifications: LocalNotifications,
    private plt:Platform,
    private loginService:LoginService) {
    //this.getMessages();
    this.loginService.getAuthenticatedUser().then(value=>{
      this.AuthenticatedUser=value;
    });
    
    this.storage.get("grade").then(value=>{
      this.myYear=value;
    })
    this.events=this.loginService.getEvents();
    
    
  }
  day="SUN";
  textValue;
  right=false;
  // changeDay(day){
  //   this.day=day
  //   console.log(this.day)
  //   //this.day=day;
  // }
  
  AuthenticatedUser:any;
  checkClass() {
    
    return !this.right;
    
  } 

  listen():void{
    
    this.speech.startListening()
    .subscribe(
      (matches: Array<string>) => {
        this.textValue = matches[0];
      },
      (onerror) => console.log('error:', onerror)
    )
    
  }
  ngOnInit(){
    this.messages=[];
    
    // this.plt.ready().then(()=>{
    //   this.notification();
    // });
    
    //speech callback
     this.speech.hasPermission()
       .then((hasPermission: boolean) => {

         if (!hasPermission) {
         this.speech.requestPermission()
           .then(
             () => console.log('Granted'),
             () => console.log('Denied')
           )
         }

      });
  }
  stoplisten(){
    this.speech.stopListening().then(()=>{
      console.log("listtening stoped")
    });
  }

  async availableLang():Promise<Array<String>>{
    try{
      
      const langs= await this.speech.getSupportedLanguages();
      console.log(langs);
      return langs;
    }
    catch(e){
      console.log(e);
    }
  }

  async hasPermissions():Promise<boolean>{
    try{
      this.getPermissions();
      const hasPermission=this.speech.hasPermission();
      console.log("has Permissions");
      return hasPermission;
    }
    catch(e){
      console.log(e);
    }
  }


  async getPermissions():Promise<void>{
    try{
      const permissions= await this.speech.requestPermission();
      console.log(permissions);
    }
    catch(e){
      console.log(e);
    }
  }
  



  messages: any[] = [];
  responds:any[] =[];
  schedule:any[]=[];
  events:any[]=[];
  myYear;

  // notification(){
  //   for(let i=0;i<this.events.length;i++){
  //     let mydate = new Date(this.events[i].fields.date);
  //     let parts = this.events[i].fields.date.split('-');
  //     mydate = new Date(parts[0],parts[1]-1,parts[2]);
  //     if(this.events[i].fields.year == this.myYear){

  //       this.localNotifications.schedule({
  //         text: this.events[i].fields.name,
  //         trigger: {at: mydate},
  //         led: 'FF0000',
  //         sound:  "res://platform_default",
  //         actions: [
  //           { id: 'yes', title: 'OK' },
  //         ],
  //         smallIcon: 'res://calendar',
  //         badge:1,
  //         lockscreen:true,
          
  //       });

  //     }
  //   }
  //   this.localNotifications.schedule({
  //     text: 'Test Notification',
  //     trigger: {at: new Date(new Date().getTime() + 180000) },
  //     led: 'FF0000',
  //     sound:  "res://platform_default",
  //     actions: [
  //       { id: 'yes', title: 'OK' },
  //     ],
  //     smallIcon: 'res://calendar',
  //     badge:1,
  //     lockscreen:true,
      
  //   });
  // }

  callFunction(){
    this.content.scrollToBottom(0);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatroomPage');
    //this.scrollToBottom();
  }
  /*scrollToBottom(){
    this.feedContainer.nativeElement.scrollTop=this.feedContainer.nativeElement.scrollHeight;
  }*/
  // getMessages(){
  //   this.storage.ready().then(()=>{
  //     this.storage.forEach((v,k,i)=>{
  //       if(k.slice(0,8)==='message-'){
  //         this.messages.push(v);
  //       }
  //     });
  //   });
  // }

  send(content){
    if(content.value != ""){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });

      let postReq={
        name:content.value
      }

      this.http.post(ipConfig.ip+"msg/",JSON.stringify(postReq),options)
      .subscribe(response=>{
        console.log(response);
        
        console.log("valid account");
        let result= response.json();
        let newResult=JSON.parse(result);
        
        if(newResult.source=="db"){
          
          this.messages.push({id:'schedule',data:newResult.data,status: 'recevied'})
          //console.log(this.schedule[0].content[0].fields.instructor_name)
          console.log(this.messages)

        }
        if(newResult.source=="event"){
          
          this.messages.push({id:'event',content:newResult.data,status: 'recevied'});
          console.log(newResult.data)
        }
        
        if(newResult.source=="AI"){
          // this.storage.ready().then(()=>{
          //   let responds = {
          //     id:this.genRandomId(),
          //     content:newResult.data,
          //   };
            
          //   this.storage.set('responds-'+responds.id,responds);
          //   this.messages.push({id:'response',content:responds.content,status: 'recevied'});
            
          // });
          let responds = {
            id:this.genRandomId(),
            content:newResult.data,
          };
          this.messages.push({id:'response',content:responds.content,status: 'recevied'});
        }
        
        
      });
      console.log(JSON.stringify(postReq))
      // this.storage.ready().then(()=>{
      //   let message = {
      //     id:this.genRandomId(),
      //     content:content.value
      //   };
      //   this.storage.set('message-'+message.id,message);
      //   this.messages.push({id:'message',content:message.content,status: 'pending'});
      //   content.value="";
      // });
      let message = {
        id:this.genRandomId(),
        content:content.value
      };
      this.messages.push({id:'message',content:message.content,status: 'pending'});
      content.value="";
    }
    console.log(this.messages);
    console.log(this.responds);
  }

  genRandomId() {
    return Math.floor(Math.random() * 9999); // up to 4 digits random
  }

  createPost(formVal){
    // let post={
    //   username:this.username,
    //   password:this.password
    // }
     //this.http.post("https://jsonplaceholder.typicode.com/users",JSON.stringify(formVal.value))
    this.http.post(ipConfig.ip+"msg/",JSON.stringify(formVal.value))
    .subscribe(response=>{
      console.log(response);
      console.log("valid account");
      console.log(JSON.stringify(formVal.value));
    });
  }


}
