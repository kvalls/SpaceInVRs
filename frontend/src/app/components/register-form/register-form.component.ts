import { User } from './../../shared/auth/user';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
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
      console.log(this.ionicForm.value)
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
