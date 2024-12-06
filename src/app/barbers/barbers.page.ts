import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.page.html',
  styleUrls: ['./barbers.page.scss'],
})
export class BarbersPage implements OnInit {
  Math = Math;

  barbers = [
    {
      email: 'barbero1',
      username: 'Carlos Martínez',
      specialty: 'Cortes Clásicos',
      experience: '10 años',
      description: 'Experto en cortes tradicionales y estilos vintage. Conocido por su precisión y atención al detalle.',
      rating: 4.8
    },
    {
      email: 'barbero2',
      username: 'Juan Rodríguez',
      specialty: 'Cortes Modernos',
      experience: '7 años',
      description: 'Maestro en tendencias contemporáneas y estilos urbanos. Innovador y creativo en cada corte.',
      rating: 4.6
    }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async showBarberDetails(barber: any) {
    const safeHtml = this.sanitizer.bypassSecurityTrustHtml(`
      <div class="barber-details-alert">
        <p><strong>Especialidad:</strong> ${barber.specialty || 'No especificado'}</p>
        <p><strong>Experiencia:</strong> ${barber.experience || 'No especificado'}</p>
        <p><strong>Descripción:</strong> ${barber.description || 'Sin descripción'}</p>
        <p><strong>Rating:</strong> ${this.generateStars(barber.rating)}</p>
      </div>
    `);

    const alert = await this.alertController.create({
      header: barber.username || 'Barbero',
      message: safeHtml as any,
      cssClass: 'custom-alert',
      buttons: ['OK']
    });

    await alert.present();
  }

  private generateStars(rating: number): string {
    if (!rating) return 'Sin calificación';
    
    const roundedRating = Math.min(Math.max(Math.round(rating), 0), 5);
    return '⭐'.repeat(roundedRating);
  }

  goBack() {
    this.router.navigate(['/principal']);
  }
}