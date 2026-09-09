import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarmUpData, VocabItem, WarmUpItem } from '../../models/lesson.data';

@Component({
  selector: 'app-warm-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warm-up.html',
  styleUrls: ['./warm-up.scss']
})
export class WarmUpComponent implements OnInit {
  @Input() data!: WarmUpData;
  
  displayItems: WarmUpItem[] = [];
  displayChoices: VocabItem[] = [];
  
  selectedChoice: VocabItem | null = null;
  draggedChoice: VocabItem | null = null;
  answers: { [key: string]: VocabItem | null } = {};
  isSubmitted = false;

  ngOnInit() {
    // Shuffle and initialize
    this.displayItems = this.shuffleArray([...this.data.items]);
    this.displayChoices = this.shuffleArray([...this.data.choices]);

    this.displayItems.forEach(item => {
      this.answers[item.id] = null;
    });
  }

  // --- Shuffle Logic ---
  private shuffleArray<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // --- Click to match ---
  selectChoice(choice: VocabItem) {
    if (this.isSubmitted) return;
    this.selectedChoice = choice;
  }

  fillBlank(item: WarmUpItem) {
    if (this.isSubmitted) return;
    if (this.selectedChoice) {
      this.answers[item.id] = this.selectedChoice;
      this.selectedChoice = null;
    }
  }

  // --- Drag and Drop ---
  onDragStart(choice: VocabItem) {
    if (this.isSubmitted) return;
    this.draggedChoice = choice;
  }

  onDragOver(event: DragEvent) {
    if (this.isSubmitted) return;
    event.preventDefault(); // allow drop
  }

  onDrop(event: DragEvent, item: WarmUpItem) {
    event.preventDefault();
    if (this.isSubmitted) return;
    if (this.draggedChoice) {
      this.answers[item.id] = this.draggedChoice;
      this.draggedChoice = null;
    }
  }

  // --- Interaction ---
  removeAnswer(item: WarmUpItem) {
    if (this.isSubmitted) return;
    this.answers[item.id] = null;
  }

  checkAnswers() {
    this.isSubmitted = true;
  }

  reset() {
    this.isSubmitted = false;
    this.selectedChoice = null;
    this.draggedChoice = null;
    Object.keys(this.answers).forEach(k => this.answers[k] = null);
    
    // Reshuffle on reset
    this.displayItems = this.shuffleArray([...this.data.items]);
    this.displayChoices = this.shuffleArray([...this.data.choices]);
  }

  isCorrect(item: WarmUpItem): boolean {
    return this.answers[item.id]?.id === item.expectedVocabId;
  }

  getCorrectCount(): number {
    return this.displayItems.filter(item => this.isCorrect(item)).length;
  }

  get isPerfect(): boolean {
    return this.getCorrectCount() === this.displayItems.length;
  }

  get correctAnswersArray(): string[] {
    return this.displayItems.map((item, index) => {
      const choiceIndex = this.displayChoices.findIndex(c => c.id === item.expectedVocabId);
      const letter = String.fromCharCode(65 + choiceIndex);
      return `${index + 1}-${letter}`;
    });
  }
}
