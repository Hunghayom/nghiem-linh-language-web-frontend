import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="audio-btn" 
      [class.playing]="isPlaying"
      (click)="playAudio()"
      [attr.title]="label">
      <span class="icon">{{ isPlaying ? '🔊' : '🔈' }}</span>
      <span class="label" *ngIf="showLabel">{{ label }}</span>
    </button>
  `,
  styles: [`
    .audio-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid #e5e7eb;
      background-color: #f9fafb;
      color: #374151;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: #f3f4f6;
        border-color: #d1d5db;
        transform: scale(1.05);
      }
      
      &.playing {
        background-color: #eff6ff;
        border-color: #bfdbfe;
        color: #1d4ed8;
      }
    }
  `]
})
export class AudioPlayerComponent {
  @Input() src: string = '';
  @Input() label: string = 'Nghe mẫu';
  @Input() showLabel: boolean = true;
  
  isPlaying = false;
  private audio = new Audio();

  playAudio() {
    if (!this.src) return;
    
    if (this.isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    
    this.audio.src = this.src;
    this.audio.play();
    this.isPlaying = true;
    
    this.audio.onended = () => {
      this.isPlaying = false;
    };
  }
}
