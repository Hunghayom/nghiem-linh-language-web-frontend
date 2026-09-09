import { Component, OnInit, HostListener, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
export interface Unit {
  id: number;
  title: string;
  totalLessons: number;
  completedLessons: number;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.scss'
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  currentHsk = 'hsk1';
  courseId: string | null = '';

  hskLevels = [
    { id: 'hsk1', name: 'HSK 1', theme: 'theme-pastel-green' },
    { id: 'hsk2', name: 'HSK 2', theme: 'theme-pastel-blue' },
    { id: 'hsk3', name: 'HSK 3', theme: 'theme-pastel-orange' }
  ];

  units: Unit[] = [];
  activeUnitId: number | null = null;
  activeTheme = 'theme-pastel-green';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onGlobalScroll, true);
    });

    this.courseId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe(params => {
      if (params['sublevel']) {
        this.selectHsk(params['sublevel']);
      } else {
        this.selectHsk('hsk1');
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onGlobalScroll, true);
  }

  onGlobalScroll = (event: Event) => {
    if (this.activeUnitId !== null) {
      this.ngZone.run(() => {
        this.activeUnitId = null;
        this.cdr.detectChanges(); // Bắt buộc render lại giao diện ngay lập tức
      });
    }
  }

  selectHsk(hskId: string) {
    const level = this.hskLevels.find(l => l.id === hskId);
    if (level) {
      this.currentHsk = hskId;
      this.activeTheme = level.theme;
      this.activeUnitId = null;
      this.generateUnits(hskId);
    }
  }

  generateUnits(hskId: string) {
    // 15 units for HSK1 and HSK2, 18 for HSK3
    const count = (hskId === 'hsk1' || hskId === 'hsk2') ? 15 : 18;
    this.units = Array.from({ length: count }, (_, i) => {
      let completed = 0;
      if (hskId === 'hsk1') {
        if (i === 0) completed = 12; // Completed
        else if (i === 1) completed = 5; // In progress
        else completed = 0; // Not started
      }
      return {
        id: i + 1,
        title: `Bài ${i + 1}`,
        totalLessons: 12,
        completedLessons: completed
      };
    });
  }

  toggleUnit(event: Event, unitId: number) {
    event.stopPropagation();
    if (this.activeUnitId === unitId) {
      this.activeUnitId = null;
    } else {
      this.activeUnitId = unitId;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activeUnitId = null;
  }

  getUnitActionText(unit: Unit): string {
    if (unit.completedLessons === 0) return 'Bắt đầu học';
    if (unit.completedLessons < unit.totalLessons) return 'Tiếp tục học';
    return 'Luyện tập lại';
  }

  startUnit(event: Event, unit: Unit) {
    event.stopPropagation();
    console.log(`Starting unit ${unit.id}`);
    this.router.navigate(['/lesson', unit.id], { queryParams: { theme: this.activeTheme } });
  }
}
