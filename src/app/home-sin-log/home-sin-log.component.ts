import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../Interfaces/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-sin-log',
  standalone: true,
  imports: [RouterLink, CarruselComponent, CommonModule],
  templateUrl: './home-sin-log.component.html',
  styleUrl: './home-sin-log.component.css'
})
export class HomeSinLogComponent {

  currentBackgroundIndex = 0;
  upcomingBackgroundIndex: number = 1;
  authService: AuthenticationService | undefined;
  userId: string | null = null;
  isLoggedin = false;
  collapsed = true;
  userEmail = '';
  isAdmin = false;
  user: User | undefined;

  backgroundImages = [
    'https://i.ibb.co/h7pR39B/restaurante-madrid.jpg',
    'https://i.ibb.co/ZxDKXcg/PTM2MDoq.jpg',
    'https://i.ibb.co/wz8hFnr/Ml-BKU0p-KTTQuan-Bn.jpg',
    'https://i.ibb.co/F8cg23f/a-Xpl-PTY0-MDoq.jpg',
    'https://i.ibb.co/9q4N7q7/restaurante-5.jpg',
  ];
  
  ngOnInit(): void {
    this.startBackgroundSequence();
  }
  constructor(private httpClient: HttpClient, authService: AuthenticationService, router: Router) {
    this.authService = authService;
    if (this.authService) {
      this.authService.isLoggedin.subscribe(isLoggedin => this.isLoggedin = isLoggedin);
      this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
      this.authService.userId.subscribe(userId => this.userId = userId);
    }
  }
  startBackgroundSequence() {
    setInterval(() => {
      this.upcomingBackgroundIndex = (this.currentBackgroundIndex + 1) % this.backgroundImages.length;
      this.fadeTransition();
    }, 10000); // Cambia cada 10 segundos
  }
  fadeTransition() {
    const currentImgElement = document.querySelector('.img-welcome .background-image:not(.upcoming)') as HTMLElement;
    const upcomingImgElement = document.querySelector('.img-welcome .background-image.upcoming') as HTMLElement;

    upcomingImgElement.style.opacity = '1'; // Hace visible la nueva imagen
    setTimeout(() => {
      this.currentBackgroundIndex = this.upcomingBackgroundIndex;
      currentImgElement.style.backgroundImage = `url('${this.getCurrentImage()}')`;
      upcomingImgElement.style.opacity = '0'; // Restablece la opacidad para la próxima imagen
    }, 2000); // Debe coincidir con la duración de la transición de opacidad
  }
  getCurrentImage(): string {
    return this.backgroundImages[this.currentBackgroundIndex];
  }
  getUpcomingImage() {
    return this.backgroundImages[this.upcomingBackgroundIndex];
  }

}
