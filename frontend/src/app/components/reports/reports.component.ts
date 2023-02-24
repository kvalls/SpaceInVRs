import { AuthService } from './../../shared/auth/auth.service';
import { User } from './../../shared/auth/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  user: User;
  isAdmin: boolean = false;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserData().then((data) => {
      this.user = data;
      console.log("soyadmin"+this.user.role_id)
      if (this.user.role_id === 1){
        this.isAdmin = true;
      }
    });
  }

  allReportsClick() {
    window.location.replace('http://localhost:5488/templates/g-UQf7YbRO');
  }

  allUsersClick() {
    window.location.replace('http://localhost:5488/templates/VBoeQ25pc');
  }

}
