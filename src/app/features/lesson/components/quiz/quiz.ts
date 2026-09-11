import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizData, QuizQuestion } from '../../models/lesson.data';
import { shuffleArray } from '../../../../shared/utils/array.utils';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})
export class QuizComponent implements OnInit {
  @Input() data!: QuizData;
  @Input() isFinalTest: boolean = false;
  @Output() answerChecked = new EventEmitter<boolean>();
  displayQuestions: QuizQuestion[] = [];

  answers: { [key: string]: string } = {};
  submitted: boolean = false;

  ngOnInit() {
    this.setupQuiz();
  }

  setupQuiz() {
    this.submitted = false;
    this.answers = {};
    this.displayQuestions = shuffleArray(this.data.questions).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }

  selectOption(questionId: string, optionId: string) {
    if (this.submitted) return;
    this.answers[questionId] = optionId;
  }

  isCorrect(q: QuizQuestion): boolean {
    return this.answers[q.id] === q.correctOptionId;
  }

  checkAnswers() {
    this.submitted = true;
    this.answerChecked.emit(this.isPerfect);
  }

  reset() {
    this.setupQuiz();
  }

  scrollToQuestion(index: number) {
    const el = document.getElementById('question-' + index);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  getCorrectCount(): number {
    return this.displayQuestions.filter(q => this.isCorrect(q)).length;
  }

  get isPerfect(): boolean {
    return this.getCorrectCount() === this.displayQuestions.length;
  }

  getTrackerClass(q: QuizQuestion): string {
    if (!this.submitted) {
      return this.answers[q.id] ? 'answered' : 'unanswered';
    }
    if (!this.answers[q.id]) return 'unanswered';
    return this.isCorrect(q) ? 'correct' : 'incorrect';
  }
}
