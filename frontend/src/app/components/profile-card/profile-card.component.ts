import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {

  user: any = []

  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.getUser(this.user);
  }

  ionViewDidEnter() {

  }

}
