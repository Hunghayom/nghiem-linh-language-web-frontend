import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recorder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recorder-container">
      <button 
        class="record-btn" 
        [class.recording]="isRecording"
        (click)="toggleRecording()"
        [attr.title]="isRecording ? 'Dừng ghi âm' : 'Ghi âm'">
        <span class="icon">🎙️</span>
        <span class="label">{{ isRecording ? 'Đang ghi...' : 'Ghi âm' }}</span>
      </button>
      
      <div class="score-display" *ngIf="score !== null">
        <span class="score" [style.color]="getScoreColor()">{{ score }}/10</span>
      </div>
    </div>
  `,
  styles: [`
    .recorder-container {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    .record-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 24px;
      border: 1px solid #e5e7eb;
      background-color: #f9fafb;
      color: #374151;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #fee2e2;
        border-color: #fca5a5;
        color: #dc2626;
      }
      
      &.recording {
        background-color: #ef4444;
        border-color: #ef4444;
        color: white;
        animation: pulse 1.5s infinite;
      }
    }

    .score-display {
      font-weight: 600;
      font-size: 16px;
      padding: 4px 8px;
      background-color: #f3f4f6;
      border-radius: 8px;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `]
})
export class RecorderComponent {
  @Input() maxDuration: number = 10; // seconds
  @Output() onRecordEnd = new EventEmitter<Blob>();

  isRecording = false;
  score: number | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.addEventListener("dataavailable", event => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.onRecordEnd.emit(audioBlob);

        // Mock scoring for UI demonstration
        this.score = Math.floor(Math.random() * 4) + 7; // Random 7 to 10
      });

      this.mediaRecorder.start();
      this.isRecording = true;
      this.score = null;
    } catch (err) {
      console.error("Microphone access denied or error occurred", err);
      alert("Vui lòng cấp quyền sử dụng microphone để ghi âm.");
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      this.isRecording = false;
    }
  }

  getScoreColor(): string {
    if (!this.score) return '#374151';
    if (this.score >= 9) return '#16a34a';
    if (this.score >= 7) return '#d97706';
    return '#dc2626';
  }
}
