import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,  private router: Router) { }

  ngOnInit(): void {
    this.updateAuthInfo();
  }

  updateAuthInfo(){
    this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.updateAuthInfo();
    this.router.navigateByUrl("/home");
  }

}
