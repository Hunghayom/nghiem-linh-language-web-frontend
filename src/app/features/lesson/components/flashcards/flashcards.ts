import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardData } from '../../models/lesson.data';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.html',
  styleUrl: './flashcards.scss'
})
export class FlashcardsComponent {
  @Input() data?: FlashcardData;
  
  currentIndex = 0;
  isFlipped = false;

  get currentCard() {
    return this.data?.words[this.currentIndex];
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard(known: boolean) {
    if (this.data && this.currentIndex < this.data.words.length - 1) {
      this.isFlipped = false;
      setTimeout(() => {
        this.currentIndex++;
      }, 150); // Đợi CSS animation flip hoàn tất một phần
    } else {
      alert(known ? 'Bạn đã hoàn thành bộ thẻ nhớ!' : 'Bạn đã xem hết bộ thẻ nhớ!');
    }
  }

  playAudio() {
    // TODO: implement
  }
}
