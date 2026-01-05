import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value as User)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.userObj));
            if (this.authService.isAdmin()) {
              this.router.navigateByUrl('admin')
            } else if (this.authService.isSalesPerson()) {
              this.router.navigateByUrl('');
            } else {
              this.router.navigateByUrl('account-pending')
            }
          },
          error: (err: any) => {
            console.error('LOGIN ERROR:', JSON.stringify(err));
            console.error(err);
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
