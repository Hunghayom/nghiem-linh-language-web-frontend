import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      course: ['Tiếng Trung', Validators.required], // Mặc định chọn Tiếng Trung
      hasStudiedBefore: [false],
      previousClass: [''], // Trường này sẽ hiển thị khi hasStudiedBefore là true
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'register') {
        this.isLoginMode = false;
      } else if (params['mode'] === 'login') {
        this.isLoginMode = true;
      }
    });
  }

  toggleMode(isLogin: boolean) {
    this.isLoginMode = isLogin;
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      // Gọi API đăng nhập ở đây
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Register Data:', this.registerForm.value);
      // Gọi API đăng ký ở đây
    }
  }
}
