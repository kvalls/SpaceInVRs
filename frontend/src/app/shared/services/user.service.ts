import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  AUTH_SERVER_ADDRESS:  string  =  'http://'+window.location.hostname+':4000';

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

  getUsers(token) {
    let myOptions = this.getOptions(token);
    console.log(myOptions)
    return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions);


    // return this.httpClient.get(`${this.AUTH_SERVER_ADDRESS}/api/users`, myOptions).pipe(
    //   tap(function (res) {
    //       console.log(res);
    //     })
    // );
  }

  getUser(id): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.AUTH_SERVER_ADDRESS}/api/users/` + id)
      .pipe(
        tap(_ => console.log(`User fetched: ${id}`)),
        catchError(this.handleError<User[]>(`Get User id=${id}`))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }  
}
