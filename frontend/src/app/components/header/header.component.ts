import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,  private router: Router, private navController: NavController) { }

  ngOnInit(): void {
    this.updateAuthInfo();
  }

  ionViewDidEnter() {
    this.updateAuthInfo();
  }

  updateAuthInfo(){
    this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.updateAuthInfo();
    this.navController.navigateBack(['/home']);
    // this.router.navigateByUrl("/home");
  }

}
