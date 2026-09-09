import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Use Angular Signals for reactive state
  currentUser = signal<User | null>(null);

  constructor() {
    // For demonstration, let's auto-login a student. 
    // In a real app, this would be tied to your authentication system.
    this.loginAs('student');
  }

  loginAs(role: 'teacher' | 'student') {
    let defaultAvatar = '';
    
    if (role === 'teacher') {
      defaultAvatar = 'assets/logo.jpg';
    } else {
      // Random avatar for student (1 to 12)
      const randomNum = Math.floor(Math.random() * 12) + 1;
      defaultAvatar = `assets/free_avatar/free_avatar_${randomNum}.png`;
    }

    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: role === 'teacher' ? 'Cô Nghiêm Linh' : 'Học viên Demo',
      role: role,
      avatarUrl: defaultAvatar
    };

    this.currentUser.set(mockUser);
  }

  logout() {
    this.currentUser.set(null);
  }

  updateProfile(name: string, avatarUrl: string) {
    const user = this.currentUser();
    if (user) {
      this.currentUser.set({
        ...user,
        name: name,
        avatarUrl: avatarUrl
      });
    }
  }
}
