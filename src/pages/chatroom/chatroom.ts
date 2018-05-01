import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Storage } from'@ionic/storage';
import { SpeechRecognition} from '@ionic-native/speech-recognition'

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
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage:Storage,
    private speech:SpeechRecognition) {
    this.getMessages();
  }
  textValue;
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
  // stoplisten(){
  //   this.speech.stopListening().then(()=>{
  //     console.log("listtening stoped")
  //   });
  // }

  // async availableLang():Promise<Array<String>>{
  //   try{
      
  //     const langs= await this.speech.getSupportedLanguages();
  //     console.log(langs);
  //     return langs;
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }

  // async hasPermissions():Promise<boolean>{
  //   try{
  //     this.getPermissions();
  //     const hasPermission=this.speech.hasPermission();
  //     console.log("has Permissions");
  //     return hasPermission;
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }


  // async getPermissions():Promise<void>{
  //   try{
  //     const permissions= await this.speech.requestPermission();
  //     console.log(permissions);
  //   }
  //   catch(e){
  //     console.log(e);
  //   }
  // }
  
  messages: any[] = [];
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
  getMessages(){
    this.storage.ready().then(()=>{
      this.storage.forEach((v,k,i)=>{
        if(k.slice(0,8)==='message-'){
          this.messages.push(v);
        }
      });
    });
  }

  send(content){
    if(content.value != ""){
      this.storage.ready().then(()=>{
        let message = {
          id:this.genRandomId(),
          content:content.value
        };
        this.storage.set('message-'+message.id,message);
        this.messages.push(message);
        content.value="";
      });
    }
  }

  genRandomId() {
    return Math.floor(Math.random() * 9999); // up to 4 digits random
  }
}
