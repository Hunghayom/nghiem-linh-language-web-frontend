import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeakingData, SpeakingTask } from '../../models/lesson.data';

@Component({
  selector: 'app-speaking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speaking.html',
  styleUrls: ['./speaking.scss']
})
export class SpeakingComponent {
  @Input() data!: SpeakingData;

  recordingStatus: { [id: string]: 'idle' | 'recording' | 'done' } = {};
  scores: { [id: string]: number } = {};

  getStatus(taskId: string) {
    return this.recordingStatus[taskId] || 'idle';
  }

  playAudio(taskId: string) {
    // Mock play audio
    console.log('Playing audio for', taskId);
  }

  toggleRecording(taskId: string) {
    const status = this.getStatus(taskId);

    if (status === 'recording') {
      // Stop recording early
      this.finishRecording(taskId);
      return;
    }

    // Start recording
    this.recordingStatus[taskId] = 'recording';

    // Mock recording duration (2.5s)
    setTimeout(() => {
      if (this.recordingStatus[taskId] === 'recording') {
        this.finishRecording(taskId);
      }
    }, 2500);
  }

  finishRecording(taskId: string) {
    this.recordingStatus[taskId] = 'done';
    // Random score between 50 and 100
    this.scores[taskId] = Math.floor(Math.random() * 51) + 50;
  }

  getScoreMessage(score: number): string {
    if (score >= 90) return 'Xuất sắc! Phát âm rất chuẩn xác.';
    if (score >= 70) return 'Rất tốt! Cố gắng giữ phong độ nhé.';
    return 'Cần cố gắng thêm! Hãy nghe mẫu và thử lại nào.';
  }
}
