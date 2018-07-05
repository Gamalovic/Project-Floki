import { Injectable } from '@angular/core';

@Injectable()
export class LoginService{
    constructor(){
    }
    AuthenticatedUser={};
    islogged=false;
    setUser(user,islogged){
        this.AuthenticatedUser=user;
        this.islogged=islogged;
    }
    getAuthenticatedUser(){
        if(this.islogged==true){
            return this.AuthenticatedUser;
        }
        else{
            return null;
        }
    }
}