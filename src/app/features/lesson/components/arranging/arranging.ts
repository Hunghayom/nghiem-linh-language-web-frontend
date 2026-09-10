import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ArrangingData, ArrangingQuestion, ArrangingWord } from '../../models/lesson.data';

@Component({
  selector: 'app-arranging',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './arranging.html',
  styleUrls: ['./arranging.scss']
})
export class ArrangingComponent implements OnInit {
  @Input() data!: ArrangingData;
  
  practiceAnswers: { [questionId: string]: string[] } = {};
  practiceSubmitted: { [questionId: string]: boolean } = {};

  ngOnInit() {
    this.data.questions.forEach(q => {
      this.practiceAnswers[q.id] = [];
      this.practiceSubmitted[q.id] = false;
    });
  }

  selectWord(question: ArrangingQuestion, wordId: string) {
    if (this.practiceSubmitted[question.id]) return;
    
    const answers = this.practiceAnswers[question.id];
    if (!answers.includes(wordId)) {
      answers.push(wordId);
    }
  }

  removeWord(question: ArrangingQuestion, wordId: string) {
    if (this.practiceSubmitted[question.id]) return;
    
    const answers = this.practiceAnswers[question.id];
    const index = answers.indexOf(wordId);
    if (index !== -1) {
      answers.splice(index, 1);
    }
  }

  getWord(question: ArrangingQuestion, wordId: string): ArrangingWord | undefined {
    return question.words.find(w => w.id === wordId);
  }

  getAvailableWords(question: ArrangingQuestion) {
    const answers = this.practiceAnswers[question.id];
    return question.words.filter(w => !answers.includes(w.id));
  }

  checkAnswer(question: ArrangingQuestion) {
    this.practiceSubmitted[question.id] = true;
  }

  resetAnswer(question: ArrangingQuestion) {
    this.practiceSubmitted[question.id] = false;
    this.practiceAnswers[question.id] = [];
  }

  drop(event: CdkDragDrop<string[]>, question: ArrangingQuestion) {
    if (this.practiceSubmitted[question.id]) return;
    moveItemInArray(this.practiceAnswers[question.id], event.previousIndex, event.currentIndex);
  }

  getCorrectAnswersText(question: ArrangingQuestion): string {
    return question.correctOrderIds
      .map(id => this.getWord(question, id)?.text || '')
      .join(' ');
  }

  isCorrect(question: ArrangingQuestion): boolean {
    const answers = this.practiceAnswers[question.id];
    const correct = question.correctOrderIds;
    
    if (answers.length !== correct.length) return false;
    return answers.every((val, index) => val === correct[index]);
  }
}
