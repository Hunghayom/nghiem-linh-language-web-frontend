import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchingData, MatchingItem, MatchingPair } from '../../models/lesson.data';

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matching.html',
  styleUrls: ['./matching.scss']
})
export class MatchingComponent implements OnInit {
  @Input() data!: MatchingData;
  
  selectedLeftId: string | null = null;
  selectedRightId: string | null = null;

  matchedPairs: MatchingPair[] = [];
  
  // To show error animation
  errorPair: { leftId: string, rightId: string } | null = null;

  ngOnInit() {
  }

  selectLeft(item: MatchingItem) {
    if (this.isMatchedLeft(item.id)) return;
    
    this.selectedLeftId = item.id;
    this.checkMatch();
  }

  selectRight(item: MatchingItem) {
    if (this.isMatchedRight(item.id)) return;
    
    this.selectedRightId = item.id;
    this.checkMatch();
  }

  checkMatch() {
    if (this.selectedLeftId && this.selectedRightId) {
      const isCorrect = this.data.pairs.some(
        p => p.leftId === this.selectedLeftId && p.rightId === this.selectedRightId
      );

      if (isCorrect) {
        // Đúng: Thêm vào danh sách matched
        this.matchedPairs.push({ leftId: this.selectedLeftId, rightId: this.selectedRightId });
        this.selectedLeftId = null;
        this.selectedRightId = null;
      } else {
        // Sai: Hiển thị lỗi rồi reset
        this.errorPair = { leftId: this.selectedLeftId, rightId: this.selectedRightId };
        
        setTimeout(() => {
          this.errorPair = null;
          this.selectedLeftId = null;
          this.selectedRightId = null;
        }, 800);
      }
    }
  }

  isMatchedLeft(id: string): boolean {
    return this.matchedPairs.some(p => p.leftId === id);
  }

  isMatchedRight(id: string): boolean {
    return this.matchedPairs.some(p => p.rightId === id);
  }

  isErrorLeft(id: string): boolean {
    return this.errorPair?.leftId === id;
  }

  isErrorRight(id: string): boolean {
    return this.errorPair?.rightId === id;
  }

  resetAll() {
    this.matchedPairs = [];
    this.selectedLeftId = null;
    this.selectedRightId = null;
    this.errorPair = null;
  }

  get isCompleted(): boolean {
    return this.matchedPairs.length === this.data.pairs.length;
  }
}
