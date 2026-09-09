import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  userService = inject(UserService);
  
  isMenuOpen = false;
  isUserMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isUserMenuOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    if (this.isUserMenuOpen) this.isMenuOpen = false;
  }

  openEditProfile() {
    this.isUserMenuOpen = false;
    // We will broadcast an event or use a service to open the modal
    // For now, we'll dispatch a custom event
    window.dispatchEvent(new CustomEvent('open-edit-profile'));
  }

  logout() {
    this.userService.logout();
    this.isUserMenuOpen = false;
  }
}
