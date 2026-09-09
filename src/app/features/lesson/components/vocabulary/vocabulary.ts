import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyData } from '../../models/lesson.data';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vocabulary.html',
  styleUrl: './vocabulary.scss'
})
export class VocabularyComponent {
  @Input() data?: VocabularyData;

  playAudio(url?: string) {
    if (!url) {
      alert('Chưa có audio cho từ này');
      return;
    }
    // TODO: implement audio playing logic
  }
}
