import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  AUTH_SERVER_ADDRESS:  string  =  'http://'+ window.location.hostname+ ':4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(token){

    let bearerAccess = 'Bearer ' + token;

    let options = {
      headers: {
        'Authorization' : bearerAccess,
        // 'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }

  getSessions(token) {
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/sessions`, myOptions);
  }

  getOwnSessions(token, id) {
    // this.authService.getUserData().then((data) => {
    //   this.user = data;
    //   console.log("holaola "+this.user.id+" holaola");
    //   console.log("holaola "+this.user.role_id+" holaola");
    //   console.log("eeee ",this.user," eeee");
    // });
    
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/sessions/user/` + id, myOptions);
  }


}
