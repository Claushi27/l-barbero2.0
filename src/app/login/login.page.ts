import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

login() {
  if (!this.loginData.email || !this.loginData.password) {
    console.log('Por favor ingrese ambos campos');
    return;
  }

  this.authService.login(this.loginData.email, this.loginData.password).subscribe(
    (user) => {
      this.authService.setCurrentUser(user);

      if (user.role === 'barbero' || user.role === 'Barbero') {
        this.router.navigate(['/barber-schedule']);
      } else {
        this.router.navigate(['/principal']);
      }
    },
    (error) => {
      console.error('Error en el inicio de sesión:', error);
    }
  );
}
}
