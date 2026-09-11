import { Component, Input, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchingData, MatchingItem, MatchingPair } from '../../models/lesson.data';
import { shuffleArray } from '../../../../shared/utils/array.utils';

interface LineData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  path: string;
  status: 'default' | 'correct' | 'incorrect';
}

@Component({
  selector: 'app-matching',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matching.html',
  styleUrls: ['./matching.scss']
})
export class MatchingComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data!: MatchingData;
  @Input() isFinalTest: boolean = false;
  @Output() answerChecked = new EventEmitter<boolean>();
  
  @ViewChild('columnsContainer') columnsContainer!: ElementRef;
  
  displayLeftItems: MatchingItem[] = [];
  displayRightItems: MatchingItem[] = [];
  
  userConnections: { leftId: string, rightId: string }[] = [];
  selectedLeftId: string | null = null;
  selectedRightId: string | null = null;

  lines: LineData[] = [];
  
  submitted: boolean = false;
  isAllCorrect: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setupMatching();
  }

  setupMatching() {
    this.displayLeftItems = shuffleArray(this.data.leftItems);
    this.displayRightItems = shuffleArray(this.data.rightItems);
    this.userConnections = [];
    this.selectedLeftId = null;
    this.selectedRightId = null;
    this.submitted = false;
    this.isAllCorrect = false;
  }

  ngAfterViewInit() {
    setTimeout(() => this.drawLines(), 100);
  }

  @HostListener('window:resize')
  onResize() {
    this.drawLines();
  }

  selectLeft(item: MatchingItem) {
    if (this.submitted) return;
    // Bỏ chọn nếu bấm lại
    if (this.selectedLeftId === item.id) {
      this.selectedLeftId = null;
      return;
    }
    this.selectedLeftId = item.id;
    this.tryConnect();
  }

  selectRight(item: MatchingItem) {
    if (this.submitted) return;
    // Bỏ chọn nếu bấm lại
    if (this.selectedRightId === item.id) {
      this.selectedRightId = null;
      return;
    }
    this.selectedRightId = item.id;
    this.tryConnect();
  }

  tryConnect() {
    if (this.selectedLeftId && this.selectedRightId) {
      // Xóa các liên kết cũ của 2 item này
      this.userConnections = this.userConnections.filter(c => 
        c.leftId !== this.selectedLeftId && c.rightId !== this.selectedRightId
      );
      // Thêm liên kết mới
      this.userConnections.push({ leftId: this.selectedLeftId, rightId: this.selectedRightId });
      
      this.selectedLeftId = null;
      this.selectedRightId = null;
      
      this.drawLines();
    }
  }

  drawLines() {
    if (!this.columnsContainer) return;
    const containerRect = this.columnsContainer.nativeElement.getBoundingClientRect();
    
    this.lines = this.userConnections.map(conn => {
      const leftEl = document.getElementById(`item-${conn.leftId}`);
      const rightEl = document.getElementById(`item-${conn.rightId}`);
      
      if (!leftEl || !rightEl) return null;

      const lRect = leftEl.getBoundingClientRect();
      const rRect = rightEl.getBoundingClientRect();

      // Điểm bắt đầu (mép phải của item trái)
      const startX = lRect.right - containerRect.left;
      const startY = lRect.top + (lRect.height / 2) - containerRect.top;

      // Điểm kết thúc (mép trái của item phải)
      const endX = rRect.left - containerRect.left;
      const endY = rRect.top + (rRect.height / 2) - containerRect.top;

      // Tính đường cong bezier dạng ống nước
      // Tăng khoảng cách control point tỷ lệ thuận với khoảng cách X để đường cong mượt hơn
      const dx = Math.abs(endX - startX);
      const cpOffset = Math.max(50, dx * 0.4); 
      
      const controlPointX1 = startX + cpOffset;
      const controlPointX2 = endX - cpOffset;
      
      const path = `M ${startX} ${startY} C ${controlPointX1} ${startY}, ${controlPointX2} ${endY}, ${endX} ${endY}`;

      let status: 'default' | 'correct' | 'incorrect' = 'default';
      if (this.submitted) {
        const isCorrect = this.data.pairs.some(p => p.leftId === conn.leftId && p.rightId === conn.rightId);
        status = isCorrect ? 'correct' : 'incorrect';
      }

      return { startX, startY, endX, endY, path, status };
    }).filter(l => l !== null) as LineData[];
    
    this.cdr.detectChanges();
  }

  checkAnswers() {
    this.submitted = true;
    
    // Kiểm tra xem tất cả các cặp đã ghép có đúng không
    let allCorrect = true;
    if (this.userConnections.length === this.data.pairs.length) {
      allCorrect = this.userConnections.every(conn => 
        this.data.pairs.some(p => p.leftId === conn.leftId && p.rightId === conn.rightId)
      );
    } else {
      allCorrect = false;
    }
    
    this.isAllCorrect = allCorrect;
    this.drawLines(); // Vẽ lại để cập nhật màu sắc
    this.answerChecked.emit(this.isAllCorrect);
  }

  resetAll() {
    this.setupMatching();
    setTimeout(() => this.drawLines(), 50);
  }

  isMatchedLeft(id: string): boolean {
    return this.userConnections.some(p => p.leftId === id);
  }

  isMatchedRight(id: string): boolean {
    return this.userConnections.some(p => p.rightId === id);
  }
}
