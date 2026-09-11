import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarData, GrammarRule } from '../../models/lesson.data';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { shuffleArray } from '../../../../shared/utils/array.utils';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './grammar.html',
  styleUrls: ['./grammar.scss']
})
export class GrammarComponent implements OnInit {
  @Input() data!: GrammarData;
  displayRules: GrammarRule[] = [];
  
  // Track answers for each rule's practice
  practiceAnswers: { [ruleId: string]: string[] } = {};
  practiceSubmitted: { [ruleId: string]: boolean } = {};

  ngOnInit() {
    this.setupGrammar();
  }

  setupGrammar() {
    this.displayRules = this.data.rules.map(rule => {
      this.practiceAnswers[rule.id] = [];
      this.practiceSubmitted[rule.id] = false;
      
      if (rule.practice) {
        return {
          ...rule,
          practice: {
            ...rule.practice,
            wordsToOrder: shuffleArray(rule.practice.wordsToOrder)
          }
        };
      }
      return rule;
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
    
    const targetRule = this.displayRules.find(r => r.id === rule.id);
    if (targetRule && targetRule.practice) {
      targetRule.practice.wordsToOrder = shuffleArray(targetRule.practice.wordsToOrder);
    }
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
