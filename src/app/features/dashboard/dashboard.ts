import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  currentStep = 1;
  selectedCourse: any = null;
  selectedLevel: any = null;

  courses = [
    { id: 'tieng-trung', name: 'Khoá tiếng Trung', description: 'HSK 1-6: từ nền tảng đến nâng cao.', icon: '中', status: 'active' },
    { id: 'tieng-nhat', name: 'Khoá tiếng Nhật', description: 'Bảng chữ cái: Hiragana, Katakana, Kanji.', icon: 'あ', status: 'upcoming' },
    { id: 'luyen-thi', name: 'Luyện thi', description: 'Đang phát triển nội dung.', icon: '📝', status: 'upcoming' }
  ];

  levels = [
    { id: 'so-cap', name: 'Khoá sơ cấp (HSK 1, 2, 3)', description: 'Nền tảng tiếng Trung cho người mới bắt đầu.', icon: '🌱', status: 'active' },
    { id: 'trung-cao', name: 'Khoá Trung - Cao cấp (HSK 4, 5, 6)', description: 'Nâng cao vốn từ, ngữ pháp và kỹ năng thi.', icon: '🚀', status: 'upcoming' }
  ];

  constructor(private router: Router) { }

  selectCourse(course: any) {
    if (course.status === 'active') {
      this.selectedCourse = course;
      this.currentStep = 2;
    }
  }

  selectLevel(level: any) {
    this.selectedLevel = level;
    if (level.id === 'so-cap') {
      this.currentStep = 3;
    } else {
      // Default behavior if not so-cap
      this.router.navigate(['/course', this.selectedCourse.id], { queryParams: { level: level.id } });
    }
  }

  goToSubLevel(subLevel: string) {
    this.router.navigate(['/course', this.selectedCourse.id], { queryParams: { level: this.selectedLevel.id, sublevel: subLevel } });
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
