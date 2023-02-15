import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { PhotoService } from './../../shared/services/photo.service';
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

  ionicForm: FormGroup;
  isSubmitted: boolean = false;
  user: User;
  capturedPhoto: string = "";

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private photoService: PhotoService,
    private router: Router,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.getUserData().then((data) => {
      this.user = data;
      console.log("holaola "+this.user.id+" holaola");
      console.log("holaola "+this.user.role_id+" holaola");
      console.log("eeee ",this.user," eeee");
    });
    // this.userService.getUser(this.user);

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  handleClick() {
    // window.location.replace('http://localhost:5488/templates/g-UQf7YbRO');
  }

  ionViewDidEnter() {
    console.log(this.authService.getUserData());
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  register() {
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
        name: this.ionicForm.value.name,
        role_id: 2,
      };
      this.authService.register(user).subscribe((res) => {
        this.router.navigateByUrl('/profile');
        this.ionicForm.reset();
      });
    }
    
  }
  

}
