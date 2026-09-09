import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VocabularyData, VocabItem } from '../../models/lesson.data';

@Component({
  selector: 'app-vocabulary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vocabulary.html',
  styleUrls: ['./vocabulary.scss']
})
export class VocabularyComponent {
  @Input() data!: VocabularyData;
  
  selectedWord: VocabItem | null = null;

  openDetail(word: VocabItem) {
    this.selectedWord = word;
  }

  closeDetail() {
    this.selectedWord = null;
  }

  playAudio(event: Event, word: VocabItem) {
    event.stopPropagation();
    // TODO: implement actual audio playback
    console.log('Playing audio for:', word.hanzi);
  }
}
