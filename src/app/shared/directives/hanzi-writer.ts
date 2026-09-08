import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import HanziWriter from 'hanzi-writer';

@Directive({
  selector: '[appHanziWriter]',
  standalone: true
})
export class HanziWriterDirective implements OnChanges {
  @Input('appHanziWriter') character: string = '';
  private writer: any;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['character'] && this.character) {
      this.el.nativeElement.innerHTML = ''; // Xóa nét cũ
      this.writer = HanziWriter.create(this.el.nativeElement, this.character, {
        width: 100,
        height: 100,
        padding: 5,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 50,
      });
      // Tự động vẽ khi render
      this.writer.animateCharacter();
    }
  }
}