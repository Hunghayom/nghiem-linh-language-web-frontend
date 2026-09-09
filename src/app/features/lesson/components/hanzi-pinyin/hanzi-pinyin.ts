import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hanzi-pinyin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hanzi-container" [ngClass]="{'large': size === 'large', 'small': size === 'small'}">
      <div class="pinyin">{{ pinyin }}</div>
      <div class="hanzi">{{ hanzi }}</div>
    </div>
  `,
  styles: [`
    .hanzi-container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 4px;
    }
    
    .pinyin {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.2;
    }
    
    .hanzi {
      font-size: 24px;
      color: #1f2937;
      font-weight: 500;
      font-family: "Kaiti", "KaiTi", "STKaiti", serif;
      line-height: 1.2;
    }
    
    /* Sizes */
    .hanzi-container.large {
      .pinyin { font-size: 18px; }
      .hanzi { font-size: 48px; }
    }
    
    .hanzi-container.small {
      .pinyin { font-size: 11px; }
      .hanzi { font-size: 18px; }
    }
  `]
})
export class HanziPinyinComponent {
  @Input() hanzi: string = '';
  @Input() pinyin: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
