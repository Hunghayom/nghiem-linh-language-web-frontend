import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunFactsData } from '../../models/lesson.data';

@Component({
  selector: 'app-fun-facts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fun-facts.html',
  styleUrls: ['./fun-facts.scss']
})
export class FunFactsComponent {
  @Input() data!: FunFactsData;
}
