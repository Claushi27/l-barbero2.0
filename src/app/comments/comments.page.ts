import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Comment {
  id?: number;
  username: string;
  text: string;
  rating: number;
  date: Date;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  comments: Comment[] = [
    {
      username: 'Mario Pérez',
      date: new Date('2024-02-15'),
      rating: 5,
      text: '¡Excelente servicio! Carlos me hizo un corte increíble. Súper recomendado.'
    },
    {
      username: 'Luis García',
      date: new Date('2024-03-20'),
      rating: 4,
      text: 'Buen ambiente y profesionalismo. Juan conoce muy bien las últimas tendencias.'
    }
  ];

  newComment: Comment = {
    username: '',
    text: '',
    rating: 5,
    date: new Date()
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  addComment() {
    if (!this.newComment.username.trim() || !this.newComment.text.trim()) {
      return;
    }

    // Añadir comentario
    const commentToAdd = {
      ...this.newComment,
      date: new Date()
    };
    this.comments.unshift(commentToAdd);

    // Limpiar formulario
    this.newComment = {
      username: '',
      text: '',
      rating: 5,
      date: new Date()
    };
  }

  // Métodos de navegación
  goBack() {
    this.router.navigate(['/principal']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}