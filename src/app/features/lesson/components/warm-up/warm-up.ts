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
  
  selectedChoice: VocabItem | null = null;
  answers: { [key: string]: VocabItem | null } = {};
  isSubmitted = false;

  ngOnInit() {
    this.data.items.forEach(item => {
      this.answers[item.id] = null;
    });
  }

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

  removeAnswer(item: WarmUpItem) {
    if (this.isSubmitted) return;
    this.answers[item.id] = null;
  }

  checkAnswers() {
    this.isSubmitted = true;
    // Play sound, etc. depending on correct/incorrect
  }

  reset() {
    this.isSubmitted = false;
    this.selectedChoice = null;
    Object.keys(this.answers).forEach(k => this.answers[k] = null);
  }

  isCorrect(item: WarmUpItem): boolean {
    return this.answers[item.id]?.id === item.expectedVocabId;
  }

  getCorrectCount(): number {
    return this.data.items.filter(item => this.isCorrect(item)).length;
  }
}
