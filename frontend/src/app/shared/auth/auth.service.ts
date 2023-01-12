import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from  'rxjs/operators';
import { AuthResponse } from './auth-response';
import { User } from './user';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatus = 0;

  setLoginStatus(status: number) {
    this.loginStatus = status;
  }

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:4000';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(user: User){
    let base64UserAndPassword = window.btoa(user.email + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization' : basicAccess,
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };

    return options;
  }


  register(user: User): Observable<AuthResponse> {
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", user.name);
    const body = bodyEncoded.toString();

    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/api/users/`, body, this.getOptions(user)).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("token", res.access_token);
          await this.storage.set("userdata", res.user);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/users/signin`, null, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          this.setLoginStatus(1);
          await this.storage.set("token", res.access_token);
          await this.storage.set("userdata", res.user);
          console.log("ey "+res.user.id+" ey");
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("token");
    await this.storage.remove("userdata");
  }

  async setUserData(userData){
    userData = await this.storage.get("userdata");
  }

  async getUserData(){
    let userData = await this.storage.get("userdata");
    return userData;
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("token");
    console.log("isLoggedIn", token);
    if (token){ //Just check if exists. This should be checked with current date
      this.setLoginStatus(1);
    }else{
    return this.setLoginStatus(0);}
  }
}
