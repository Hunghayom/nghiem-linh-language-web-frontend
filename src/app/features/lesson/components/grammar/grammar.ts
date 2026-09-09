import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarData } from '../../models/lesson.data';

@Component({
  selector: 'app-grammar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grammar.html',
  styleUrl: './grammar.scss'
})
export class GrammarComponent {
  @Input() data?: GrammarData;

  // Helper function to highlight text in HTML safely
  getHighlightedHtml(text: string, highlights?: string[]): string {
    if (!highlights || highlights.length === 0) return text;
    let result = text;
    highlights.forEach(hl => {
      // Very basic replace for demonstration. Real app should use DOMPurify
      const regex = new RegExp(`(${hl})`, 'g');
      result = result.replace(regex, `<span class="highlight">$1</span>`);
    });
    return result;
  }
}
