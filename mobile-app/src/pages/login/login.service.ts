import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService{
    constructor(private storage:Storage){
    }
    events:any[]=[];
    grade:any;
    setEvents(events){
        this.events=events;
    }
    getEvents(){
        return this.events;
    }

    getAuthenticatedUser():any{
        return this.storage.get("username").then(username=>{
            if(username){
                return username 
            }
            else{
                return null
            }
        })
    }

    setGrade(grade){
        this.grade=grade;
    }
    getGrade(){
        return this.grade
    }
    


}