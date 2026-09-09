import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardData } from '../../models/lesson.data';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.html',
  styleUrls: ['./flashcards.scss']
})
export class FlashcardsComponent implements OnInit {
  @Input() data!: FlashcardData;
  @Output() progressUpdated = new EventEmitter<number>();
  
  currentIndex = 0;
  isFlipped = false;
  cardStatus: Record<string, 'memorized' | 'review' | 'unseen'> = {};

  ngOnInit() {
    this.data.words.forEach(word => {
      if (!this.cardStatus[word.id]) {
        this.cardStatus[word.id] = 'unseen';
      }
    });
  }

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
    this.data.words.sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.isFlipped = false;
  }

  markMemorized() {
    this.cardStatus[this.currentWord.id] = 'memorized';
    this.progressUpdated.emit(this.progressPercent);
    this.next();
  }

  markReview() {
    this.cardStatus[this.currentWord.id] = 'review';
    // Review status does not add to progress, but we emit just in case
    this.progressUpdated.emit(this.progressPercent);
    this.next();
  }

  get memorizedCount(): number {
    return this.data.words.filter(w => this.cardStatus[w.id] === 'memorized').length;
  }

  get progressPercent(): number {
    if (!this.data.words.length) return 0;
    return (this.memorizedCount / this.data.words.length) * 100;
  }

  get isCompleted(): boolean {
    return this.memorizedCount === this.data.words.length && this.data.words.length > 0;
  }
}
