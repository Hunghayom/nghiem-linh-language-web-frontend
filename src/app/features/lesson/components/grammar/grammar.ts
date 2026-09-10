import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarData, GrammarRule } from '../../models/lesson.data';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './grammar.html',
  styleUrls: ['./grammar.scss']
})
export class GrammarComponent implements OnInit {
  @Input() data!: GrammarData;
  
  // Track answers for each rule's practice
  practiceAnswers: { [ruleId: string]: string[] } = {};
  practiceSubmitted: { [ruleId: string]: boolean } = {};

  ngOnInit() {
    this.data.rules.forEach(rule => {
      this.practiceAnswers[rule.id] = [];
      this.practiceSubmitted[rule.id] = false;
    });
  }

  selectWord(rule: GrammarRule, wordId: string) {
    if (this.practiceSubmitted[rule.id]) return;
    
    const answers = this.practiceAnswers[rule.id];
    if (!answers.includes(wordId)) {
      answers.push(wordId);
    }
  }

  removeWord(rule: GrammarRule, wordId: string) {
    if (this.practiceSubmitted[rule.id]) return;
    
    const answers = this.practiceAnswers[rule.id];
    const index = answers.indexOf(wordId);
    if (index !== -1) {
      answers.splice(index, 1);
    }
  }

  getWordText(rule: GrammarRule, wordId: string): string {
    return rule.practice.wordsToOrder.find(w => w.id === wordId)?.text || '';
  }

  getAvailableWords(rule: GrammarRule) {
    const answers = this.practiceAnswers[rule.id];
    return rule.practice.wordsToOrder.filter(w => !answers.includes(w.id));
  }

  checkAnswer(rule: GrammarRule) {
    this.practiceSubmitted[rule.id] = true;
  }

  resetAnswer(rule: GrammarRule) {
    this.practiceSubmitted[rule.id] = false;
    this.practiceAnswers[rule.id] = [];
  }

  drop(event: CdkDragDrop<string[]>, rule: GrammarRule) {
    if (this.practiceSubmitted[rule.id]) return;
    moveItemInArray(this.practiceAnswers[rule.id], event.previousIndex, event.currentIndex);
  }

  getCorrectAnswersText(rule: GrammarRule): string {
    return rule.practice.correctOrderIds
      .map(id => this.getWordText(rule, id))
      .join(' ');
  }

  isCorrect(rule: GrammarRule): boolean {
    const answers = this.practiceAnswers[rule.id];
    const correct = rule.practice.correctOrderIds;
    
    if (answers.length !== correct.length) return false;
    return answers.every((val, index) => val === correct[index]);
  }
}
