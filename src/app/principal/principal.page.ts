import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private router: Router
  ) {}

  // Navigation Methods
  goToSchedulePage() {
    this.navCtrl.navigateForward('/calendar');
  }

  goToCommentsPage() {
    this.navCtrl.navigateForward('/comments');
  }

  goToBarbersPage() {
    this.navCtrl.navigateForward('/barbers');
  }

  // Logout Method
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Optional: Side Menu Toggle
  toggleMenu() {
    this.menuCtrl.toggle();
  }
}