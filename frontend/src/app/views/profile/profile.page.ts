import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { SessionService } from '../../shared/services/session.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService,
    private storage: Storage) { }

  ngOnInit() {
    console.log("not working below");
    // this.getOwnSessions();
    console.log("not working above");
    this.getSessions();
  }

  ionViewDidEnter(){
    // this.getSessions();
    // this.getOwnSessions();
  }

  async getSessions() {
    let token = await this.storage.get("token");
    this.sessionService.getSessions(token).subscribe(res => {
      console.log("User Logged in. This is the session list:");
      console.log(res);
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      //this.router.navigateByUrl("/home");
    });
  }

  async getOwnSessions() {
    let data = await this.storage.get("userdata");
    let id = data.id;
    let token = await this.storage.get("token");

    // this.authService.getUserData().then((data) => {
    //   this.user = data;
    //   console.log("holaola "+this.user.id+" holaola");
    //   console.log("holaola "+this.user.role_id+" holaola");
    //   console.log("eeee ",this.user," eeee");
    // });
    console.log("PROFILE");
    console.log(data.id);

    this.sessionService.getOwnSessions(token,id).subscribe(res => {
      console.log("User Logged in. This is this user's list:");
      console.log(res);
    }, error => {
      console.log(error);
      console.log("User not authenticated. Please log in");
      //this.router.navigateByUrl("/home");
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

  

}
