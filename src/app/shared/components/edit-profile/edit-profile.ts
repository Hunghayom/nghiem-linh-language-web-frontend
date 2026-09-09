import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfileComponent {
  userService = inject(UserService);
  
  isVisible = signal(false);
  editName = signal('');
  selectedAvatar = signal('');
  
  // Available avatars (1 to 12)
  availableAvatars = Array.from({length: 12}, (_, i) => `assets/free_avatar/free_avatar_${i + 1}.png`);

  constructor() {
    // Listen for custom event to open modal
    // In a real app, a dedicated ModalService would be better
    window.addEventListener('open-edit-profile', () => this.openModal());
  }

  openModal() {
    const user = this.userService.currentUser();
    if (user) {
      this.editName.set(user.name);
      this.selectedAvatar.set(user.avatarUrl);
      this.isVisible.set(true);
    }
  }

  closeModal() {
    this.isVisible.set(false);
  }

  selectAvatar(url: string) {
    this.selectedAvatar.set(url);
  }

  save() {
    this.userService.updateProfile(this.editName(), this.selectedAvatar());
    this.closeModal();
  }
}
