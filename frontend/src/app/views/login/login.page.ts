import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProfilePageRoutingModule } from '../profile/profile-routing.module';
import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/auth/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private alertController: AlertController) { }

  ngOnInit() {
  }

  login(form){
    let user: User = {
      id: null,
      email: form.value.email,
      password: form.value.password,
      name: null,
      role_id: null,
    };
    this.authService.login(user).subscribe((res)=>{
      if(!res.access_token) {
        this.presentAlert("invalid credentials");
        return;
      }
      this.router.navigateByUrl('/profile');
      form.reset();
    }, err => {
      this.presentAlert("Error");
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
