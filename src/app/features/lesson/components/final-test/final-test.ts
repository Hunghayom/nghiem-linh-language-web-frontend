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

  questionQueue: FinalTestItem[] = [];
  originalTotalQuestions: number = 0;
  testCompleted: boolean = false;
  score: number = 0;
  isCurrentQuestionChecked: boolean = false;
  wasCurrentQuestionCorrect: boolean = false;

  ngOnChanges() {
    if (this.data && this.data.questions) {
      this.questionQueue = [...this.data.questions];
      this.originalTotalQuestions = this.data.questions.length;
      this.testCompleted = false;
      this.score = 0;
      this.isCurrentQuestionChecked = false;
    }
  }

  get currentQuestion(): FinalTestItem | undefined {
    if (this.questionQueue.length === 0) return undefined;
    return this.questionQueue[0];
  }

  // Cần bắt sự kiện hoàn thành của từng dạng bài để hiện nút Tiếp tục
  onQuestionCompleted(isCorrect: boolean) {
    this.isCurrentQuestionChecked = true;
    this.wasCurrentQuestionCorrect = isCorrect;
  }

  nextQuestion() {
    this.isCurrentQuestionChecked = false;

    // Lấy câu hỏi hiện tại ra khỏi đầu hàng chờ
    const currentQ = this.questionQueue.shift();

    if (currentQ) {
      if (this.wasCurrentQuestionCorrect) {
        // Trả lời đúng, ghi nhận (chỉ cần tính tiến độ, score ở bài Final Test có thể tuỳ chọn)
        this.score++;
      } else {
        // Trả lời sai, đẩy câu này xuống cuối hàng chờ
        this.questionQueue.push(currentQ);
      }
    }

    if (this.questionQueue.length > 0) {
      // Tiếp tục làm câu tiếp theo
      // Tự động cuộn màn hình để canh giữa nội dung kiểm tra
      setTimeout(() => {
        const container = document.querySelector('.final-test-container');
        if (container) {
          container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    } else {
      // Đã hết câu hỏi trong hàng chờ
      this.testCompleted = true;
      this.progressUpdated.emit(100);
    }
  }
}
