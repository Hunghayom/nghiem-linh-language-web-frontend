import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizData, QuizQuestion } from '../../models/lesson.data';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})
export class QuizComponent {
  @Input() data!: QuizData;

  answers: { [key: string]: string } = {};
  submitted: boolean = false;

  selectOption(questionId: string, optionId: string) {
    if (this.submitted) return;
    this.answers[questionId] = optionId;
  }

  isCorrect(q: QuizQuestion): boolean {
    return this.answers[q.id] === q.correctOptionId;
  }

  checkAnswers() {
    this.submitted = true;
  }

  reset() {
    this.submitted = false;
    this.answers = {};
  }

  scrollToQuestion(index: number) {
    const el = document.getElementById('question-' + index);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  getCorrectCount(): number {
    return this.data.questions.filter(q => this.isCorrect(q)).length;
  }

  get isPerfect(): boolean {
    return this.getCorrectCount() === this.data.questions.length;
  }

  getTrackerClass(q: QuizQuestion): string {
    if (!this.submitted) {
      return this.answers[q.id] ? 'answered' : 'unanswered';
    }
    if (!this.answers[q.id]) return 'unanswered';
    return this.isCorrect(q) ? 'correct' : 'incorrect';
  }
}
