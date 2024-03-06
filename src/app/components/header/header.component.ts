import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isMobileView: boolean = false;
  constructor() {
    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  private checkViewport() {
    this.isMobileView = window.innerWidth <= 768; // Adjust as needed
  }
}
