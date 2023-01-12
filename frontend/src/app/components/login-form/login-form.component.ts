import { AlertController } from '@ionic/angular';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { User } from './../../shared/auth/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  login() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value);
      let user: User = {
        id: null,
        email: this.ionicForm.value.email,
        password: this.ionicForm.value.password,
        name: null,
        role_id: null,
      };
      this.authService.login(user).subscribe((res) => {
        if (!res.access_token) {
          this.presentAlert("invalid credentials");
          return;
        }
        // this.authService.isLoggedIn();
        this.router.navigateByUrl('/profile');
        this.ionicForm.reset();
      }, err => {
        this.presentAlert("Error");
      });
    }


    
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
