import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { User } from '../../shared/auth/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

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
