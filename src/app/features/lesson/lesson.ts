import { Component, OnInit, HostListener, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonModuleInfo, LessonType } from './models/lesson.model';
import { LessonData } from './models/lesson.data';
import { mockLessonData } from './data/lesson.mock';

import { WarmUpComponent } from './components/warm-up/warm-up';
import { VocabularyComponent } from './components/vocabulary/vocabulary';
import { FlashcardsComponent } from './components/flashcards/flashcards';
import { GrammarComponent } from './components/grammar/grammar';
import { ConversationComponent } from './components/conversation/conversation';
import { FillBlankComponent } from './components/fill-blank/fill-blank';
import { ArrangingComponent } from './components/arranging/arranging';
import { MatchingComponent } from './components/matching/matching';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [CommonModule, WarmUpComponent, VocabularyComponent, FlashcardsComponent, GrammarComponent, ConversationComponent, FillBlankComponent, ArrangingComponent, MatchingComponent],
  styleUrl: './lesson.scss',
  templateUrl: './lesson.html',
})
export class Lesson implements OnInit, OnDestroy {
  modules: LessonModuleInfo[] = [];
  activeModuleId: string = '';
  lessonData: LessonData = mockLessonData;

  activePopoverId: string | null = null;
  activePopoverMod: LessonModuleInfo | null = null;
  popoverLeft: number = 0;
  popoverTop: number = 0;

  themeClass: string = 'theme-pastel-teal';
  hskLevelName: string = 'HSK 1';
  unitName: string = 'Bài 1';
  levelAndLessonName: string = 'HSK 1 - Bài 1';

  // State cho Dropdown chọn bài học
  isLessonSelectorOpen: boolean = false;
  availableLessons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  selectedLessonIdToNavigate: string | null = null;
  dropdownLeft: number = 0;
  dropdownTop: number = 0;
  currentUnitId: string = '1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onGlobalScroll, true);
    });

    // Lấy id từ route params, subscribe để tự update khi navigate cùng trang
    this.route.paramMap.subscribe(params => {
      this.currentUnitId = params.get('id') || '1';
      this.unitName = `Bài ${this.currentUnitId}`;
      this.updateLevelAndLessonName();

      // Reset lại trạng thái bài học (mock) khi chuyển bài
      if (this.modules.length > 0) {
        this.modules.forEach(m => m.isActive = false);
        this.modules[0].isActive = true;
        this.activeModuleId = this.modules[0].id;
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['theme']) {
        this.themeClass = params['theme'];
        if (this.themeClass.includes('teal')) this.hskLevelName = 'HSK 1';
        else if (this.themeClass.includes('blue')) this.hskLevelName = 'HSK 2';
        else if (this.themeClass.includes('indigo')) this.hskLevelName = 'HSK 3';
      }
      this.updateLevelAndLessonName();
    });

    this.modules = [
      { id: '1', type: LessonType.WARM_UP, title: 'Khởi động', shortName: 'Khởi động', cnName: '热身', isActive: true, progress: 100, isLocked: false },
      { id: '2', type: LessonType.VOCABULARY, title: 'Từ mới', shortName: 'Từ mới', cnName: '生词', isActive: false, progress: 50, isLocked: false },
      { id: '3', type: LessonType.FLASHCARD, title: 'Thẻ nhớ', shortName: 'Thẻ nhớ', cnName: '闪卡', isActive: false, progress: 0, isLocked: false },
      { id: '4', type: LessonType.GRAMMAR, title: 'Ngữ pháp', shortName: 'Ngữ pháp', cnName: '语法', isActive: false, progress: 0, isLocked: false },
      { id: '5', type: LessonType.CONVERSATION, title: 'Hội thoại', shortName: 'Hội thoại', cnName: '会话', isActive: false, progress: 0, isLocked: false },
      { id: '6', type: LessonType.FILL_BLANK, title: 'Điền từ', shortName: 'Điền từ', cnName: '填空', isActive: false, progress: 0, isLocked: false },
      { id: '7', type: LessonType.ARRANGING, title: 'Sắp xếp', shortName: 'Sắp xếp', cnName: '排序', isActive: false, progress: 0, isLocked: false },
      { id: '8', type: LessonType.MATCHING, title: 'Nối câu', shortName: 'Nối câu', cnName: '连线', isActive: false, progress: 0, isLocked: false },
      { id: '9', type: LessonType.QUIZ, title: 'Trắc nghiệm', shortName: 'Trắc nghiệm', cnName: '测验', isActive: false, progress: 0, isLocked: false },
      { id: '10', type: LessonType.SPEAKING, title: 'Luyện nói', shortName: 'Luyện nói', cnName: '口语', isActive: false, progress: 0, isLocked: false },
      { id: '11', type: LessonType.FUN_FACTS, title: 'Có thể bạn chưa biết', shortName: 'Có thể bạn chưa biết', cnName: '文化', isActive: false, progress: 0, isLocked: false },
      { id: '12', type: LessonType.FINAL_TEST, title: 'Kiểm tra', shortName: 'Kiểm tra', cnName: '考试', isActive: false, progress: 0, isLocked: true },
    ];
    this.activeModuleId = this.modules[0].id;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onGlobalScroll, true);
  }

  onGlobalScroll = (event: Event) => {
    if (this.isLessonSelectorOpen || this.activePopoverId) {
      this.ngZone.run(() => {
        this.isLessonSelectorOpen = false;
        this.activePopoverId = null;
        this.activePopoverMod = null;
        this.cdr.detectChanges(); // Bắt buộc render lại tức thì
      });
    }
  }

  updateLevelAndLessonName() {
    this.levelAndLessonName = `${this.hskLevelName} - ${this.unitName}`;
  }

  openLessonSelector(event: MouseEvent) {
    event.stopPropagation();
    this.isLessonSelectorOpen = true;
    this.selectedLessonIdToNavigate = this.currentUnitId;

    // Đóng popover khác nếu đang mở
    this.activePopoverId = null;
    this.activePopoverMod = null;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.dropdownLeft = rect.left;
    this.dropdownTop = rect.bottom + 8;
  }

  closeLessonSelector() {
    this.isLessonSelectorOpen = false;
    this.selectedLessonIdToNavigate = null;
  }

  selectLessonToNavigate(id: string) {
    this.selectedLessonIdToNavigate = id;
  }

  confirmLessonNavigation() {
    if (this.selectedLessonIdToNavigate && this.selectedLessonIdToNavigate !== this.currentUnitId) {
      const doNavigate = confirm('Bạn có chắc chắn muốn chuyển sang bài học này không?');
      setTimeout(() => {
        if (doNavigate) {
          this.ngZone.run(() => {
            this.router.navigate(['/lesson', this.selectedLessonIdToNavigate], {
              queryParams: { theme: this.themeClass }
            });
            this.closeLessonSelector();
          });
        }
      }, 10);
    }
  }

  togglePopover(event: MouseEvent, mod: LessonModuleInfo): void {
    event.stopPropagation();
    // Đóng dropdown nếu đang mở
    this.closeLessonSelector();
    if (this.activePopoverId === mod.id) {
      this.activePopoverId = null;
      this.activePopoverMod = null;
    } else {
      this.activePopoverId = mod.id;
      this.activePopoverMod = mod;

      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      // Sử dụng position fixed
      this.popoverLeft = rect.left + (rect.width / 2);
      this.popoverTop = rect.bottom + 8;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.activePopoverId = null;
    this.activePopoverMod = null;
    this.closeLessonSelector();
  }

  @HostListener('window:resize')
  onResize() {
    this.activePopoverId = null;
    this.activePopoverMod = null;
    this.closeLessonSelector();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.activePopoverId = null;
    this.activePopoverMod = null;
    this.closeLessonSelector();
  }

  startLesson(mod: LessonModuleInfo): void {
    if (mod.isLocked) return;
    this.modules.forEach(m => m.isActive = false);
    mod.isActive = true;
    this.activeModuleId = mod.id;
    this.activePopoverId = null;
    this.activePopoverMod = null;
  }

  getActionText(mod: LessonModuleInfo): string {
    if (mod.progress === 100) return 'Ôn tập';
    if (mod.progress > 0) return 'Tiếp tục';
    return 'Bắt đầu';
  }

  confirmExit() {
    const doSave = confirm('Bạn có muốn lưu tiến độ trước khi thoát không?');

    // Sử dụng setTimeout và NgZone để tránh lỗi blocking UI của trình duyệt gây crash router
    setTimeout(() => {
      if (doSave) {
        this.saveProgress();
      }
      this.ngZone.run(() => {
        this.router.navigate(['/course', 'tieng-trung']);
      });
    }, 10);
  }

  saveProgress() {
    alert('Đã lưu tiến độ thành công!');
  }

  onProgressUpdated(moduleId: string, progress: number) {
    const mod = this.modules.find(m => m.id === moduleId);
    if (mod) {
      // Angular Change Detection will automatically update the UI since modules is bound
      mod.progress = progress;
      if (progress === 100) {
        // Optionally mark it completed or show a toast
      }
    }
  }
}
