import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FillBlankData, FillBlankQuestion, FillBlankChoice } from '../../models/lesson.data';
import { shuffleArray } from '../../../../shared/utils/array.utils';

@Component({
  selector: 'app-fill-blank',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fill-blank.html',
  styleUrls: ['./fill-blank.scss']
})
export class FillBlankComponent implements OnInit {
  @Input() data!: FillBlankData;
  @Output() answerChecked = new EventEmitter<boolean>();
  
  displayQuestions: FillBlankQuestion[] = [];
  
  // Track selected choice for each question
  selectedChoices: { [questionId: string]: string | null } = {};
  typedAnswers: { [questionId: string]: string } = {};
  submitted: { [questionId: string]: boolean } = {};

  ngOnInit() {
    this.setupFillBlank();
  }

  setupFillBlank() {
    this.selectedChoices = {};
    this.typedAnswers = {};
    this.submitted = {};
    
    this.displayQuestions = shuffleArray(this.data.questions);
    
    this.displayQuestions.forEach(q => {
      this.selectedChoices[q.id] = null;
      this.typedAnswers[q.id] = '';
      this.submitted[q.id] = false;
    });
  }

  selectChoice(question: FillBlankQuestion, choiceId: string) {
    if (this.submitted[question.id]) return;
    this.selectedChoices[question.id] = choiceId;
    this.typedAnswers[question.id] = ''; // Clear typed answer if they select a choice
  }

  clearSelection(question: FillBlankQuestion) {
    if (this.submitted[question.id]) return;
    this.selectedChoices[question.id] = null;
  }

  getSelectedChoice(question: FillBlankQuestion): FillBlankChoice | undefined {
    const choiceId = this.selectedChoices[question.id];
    if (!choiceId) return undefined;
    return this.data.choices.find(c => c.id === choiceId);
  }

  getExpectedChoice(question: FillBlankQuestion): FillBlankChoice | undefined {
    return this.data.choices.find(c => c.id === question.expectedChoiceId);
  }

  checkAnswer(question: FillBlankQuestion) {
    if (this.selectedChoices[question.id] || this.typedAnswers[question.id]?.trim()) {
      this.submitted[question.id] = true;
      this.answerChecked.emit(this.isCorrect(question));
    }
  }

  resetAnswer(question: FillBlankQuestion) {
    this.submitted[question.id] = false;
    this.selectedChoices[question.id] = null;
    this.typedAnswers[question.id] = '';
  }

  isCorrect(question: FillBlankQuestion): boolean {
    const expected = this.getExpectedChoice(question);
    if (!expected) return false;

    const typed = this.typedAnswers[question.id]?.trim();
    if (typed && (typed === expected.text || typed === expected.pinyin)) {
      return true;
    }
    return this.selectedChoices[question.id] === question.expectedChoiceId;
  }
}
