import { Routes } from '@angular/router';

export const routes: Routes = [
    // Route mặc định khi vào trang web (chuyển hướng đến /login)
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // Route Đăng nhập / Đăng ký
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
    },

    // Route Trang chủ / Chọn khóa học
    {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
    },

    // Route Chi tiết khóa học (cần truyền thêm ID khóa học trên URL, ví dụ: /course/tieng-trung)
    {
        path: 'course/:id',
        loadComponent: () => import('./features/course/course-detail/course-detail').then(m => m.CourseDetail)
    },

    // Route Học tập (cần truyền ID bài học, ví dụ: /lesson/bai-1)
    {
        path: 'lesson/:id',
        loadComponent: () => import('./features/lesson/lesson').then(m => m.Lesson)
    },

    // Route 404 (Khi nhập sai URL sẽ chuyển về login hoặc trang 404 tùy bạn)
    { path: '**', redirectTo: 'login' }
];
