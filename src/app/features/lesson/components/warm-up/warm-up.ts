import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarmUpData } from '../../models/lesson.data';

@Component({
  selector: 'app-warm-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warm-up.html',
  styleUrl: './warm-up.scss'
})
export class WarmUpComponent {
  @Input() data?: WarmUpData;
}
