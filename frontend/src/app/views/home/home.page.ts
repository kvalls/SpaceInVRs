import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router) {}

  loginOrJustEnter(){
    this.authService.isLoggedIn().then(loggedIn => {

      if(this.authService.loginStatus==1){
        this.router.navigateByUrl("/profile");
        return;
      } 
      this.router.navigateByUrl("/login");
    })
  }
}
