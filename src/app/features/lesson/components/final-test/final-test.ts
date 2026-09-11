import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalTestData, FinalTestItem } from '../../models/lesson.data';
import { QuizComponent } from '../quiz/quiz';
import { ArrangingComponent } from '../arranging/arranging';
import { FillBlankComponent } from '../fill-blank/fill-blank';
import { MatchingComponent } from '../matching/matching';
import { WarmUpComponent } from '../warm-up/warm-up';

@Component({
  selector: 'app-final-test',
  standalone: true,
  imports: [
    CommonModule, 
    QuizComponent, 
    ArrangingComponent, 
    FillBlankComponent, 
    MatchingComponent, 
    WarmUpComponent
  ],
  templateUrl: './final-test.html',
  styleUrl: './final-test.scss'
})
export class FinalTestComponent {
  @Input() data?: FinalTestData;
  @Output() progressUpdated = new EventEmitter<number>();

  currentQuestionIndex: number = 0;
  testCompleted: boolean = false;
  score: number = 0;

  get currentQuestion(): FinalTestItem | undefined {
    if (!this.data || !this.data.questions) return undefined;
    return this.data.questions[this.currentQuestionIndex];
  }

  // Cần bắt sự kiện hoàn thành của từng dạng bài để chuyển sang câu tiếp theo
  onQuestionCompleted(isCorrect: boolean) {
    if (isCorrect) {
      this.score++;
    }

    if (this.data && this.currentQuestionIndex < this.data.questions.length - 1) {
      // Chuyển sang câu tiếp theo
      setTimeout(() => {
        this.currentQuestionIndex++;
      }, 1500); // Đợi 1.5s để người dùng thấy kết quả trước khi sang câu mới
    } else {
      // Hoàn thành bài test
      setTimeout(() => {
        this.testCompleted = true;
        this.progressUpdated.emit(100);
      }, 1500);
    }
  }

  resetTest() {
    this.currentQuestionIndex = 0;
    this.testCompleted = false;
    this.score = 0;
    this.progressUpdated.emit(0);
  }
}
