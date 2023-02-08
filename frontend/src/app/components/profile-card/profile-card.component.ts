import { User } from './../../shared/auth/user';
import { AuthService } from './../../shared/auth/auth.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserData().then((data) => {
      this.user = data;
      console.log("holaola "+this.user.id+" holaola");
      console.log("holaola "+this.user.role_id+" holaola");
      console.log("eeee ",this.user," eeee");
    });
    // this.userService.getUser(this.user);
  }

  ionViewDidEnter() {
    // console.log(this.authService.getUserData());
  }

}
