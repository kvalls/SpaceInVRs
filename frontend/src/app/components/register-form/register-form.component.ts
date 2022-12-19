import { User } from './../../shared/auth/user';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  register(form) {
    let user: User = {
      id: null,
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      role_id: 2,
    };
    this.authService.register(user).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

}
