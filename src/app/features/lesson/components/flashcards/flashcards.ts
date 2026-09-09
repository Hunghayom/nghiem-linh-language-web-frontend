import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardData } from '../../models/lesson.data';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.html',
  styleUrls: ['./flashcards.scss']
})
export class FlashcardsComponent {
  @Input() data!: FlashcardData;
  
  currentIndex = 0;
  isFlipped = false;

  get currentWord() {
    return this.data.words[this.currentIndex];
  }

  next() {
    if (this.currentIndex < this.data.words.length - 1) {
      this.currentIndex++;
      this.isFlipped = false;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isFlipped = false;
    }
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  shuffle() {
    // Basic shuffle implementation
    this.data.words.sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.isFlipped = false;
  }
}
