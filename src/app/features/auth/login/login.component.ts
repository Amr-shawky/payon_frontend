import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <!-- Left Panel -->
      <div class="login-left">
        <div class="brand">
          <div class="brand-logo">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="22" fill="url(#g1)"/>
              <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle"
                    font-size="60" font-weight="800" fill="white">P</text>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="100" y2="100">
                  <stop offset="0%" stop-color="#6c5ce7"/>
                  <stop offset="100%" stop-color="#a29bfe"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="brand-text">
            <h1>PayOn<span class="accent">Admin</span></h1>
            <p>FinTech Management Console</p>
          </div>
        </div>

        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hs-val">94.7%</div>
            <div class="hs-lab">Transaction Success Rate</div>
          </div>
          <div class="hero-stat">
            <div class="hs-val">12.8K</div>
            <div class="hs-lab">Active Users</div>
          </div>
          <div class="hero-stat">
            <div class="hs-val">4.8M</div>
            <div class="hs-lab">Monthly Volume (SAR)</div>
          </div>
        </div>

        <div class="feature-list">
          <div class="feature-item" *ngFor="let f of features">
            <span class="f-icon">{{ f.icon }}</span>
            <span>{{ f.text }}</span>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="login-right">
        <div class="login-card">
          <div class="login-header">
            <h2>Sign In</h2>
            <p>Access the PayOn administration console</p>
          </div>

          <form (ngSubmit)="login()" #loginForm="ngForm" class="login-form" novalidate>
            <div class="form-group">
              <label>Email Address</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" class="form-control"
                       [(ngModel)]="email" name="email"
                       placeholder="admin@payon.com" required/>
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <div class="input-wrapper">
                <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input [type]="showPass ? 'text' : 'password'" class="form-control"
                       [(ngModel)]="password" name="password"
                       placeholder="Enter your password" required/>
                <button type="button" class="toggle-pass" (click)="showPass=!showPass">
                  <svg *ngIf="!showPass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="error-msg" *ngIf="error">{{ error }}</div>

            <button type="submit" class="btn btn-primary login-btn" [disabled]="loading">
              <span *ngIf="!loading">Sign In to Dashboard</span>
              <span *ngIf="loading" class="spinner-sm"></span>
            </button>

            <p class="hint-text">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              This portal is restricted to authorized administrators only.
            </p>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh; display: flex;
    }
    .login-left {
      flex: 1;
      background: linear-gradient(160deg, #0f0f1e 0%, #1a1a3e 50%, #0a0a14 100%);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      justify-content: center; padding: 60px;
      position: relative; overflow: hidden;

      &::before {
        content: '';
        position: absolute; inset: 0;
        background: radial-gradient(circle at 30% 40%, rgba(108,92,231,0.12) 0%, transparent 60%);
        pointer-events: none;
      }
    }
    .brand { display: flex; align-items: center; gap: 16px; margin-bottom: 64px; }
    .brand-text h1 { font-size: 32px; font-weight: 800; .accent { color: var(--primary-light); } }
    .brand-text p  { color: var(--text-muted); font-size: 14px; margin-top: 2px; }

    .hero-stats {
      display: flex; gap: 40px; margin-bottom: 48px;
      flex-wrap: wrap;
    }
    .hero-stat {
      .hs-val { font-size: 36px; font-weight: 800; background: linear-gradient(135deg, var(--primary-light), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .hs-lab { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
    }

    .feature-list { display: flex; flex-direction: column; gap: 14px; }
    .feature-item {
      display: flex; align-items: center; gap: 12px;
      font-size: 14px; color: var(--text-secondary);
      .f-icon { font-size: 20px; }
    }

    .login-right {
      width: 480px; flex-shrink: 0;
      background: var(--bg-dark);
      display: flex; align-items: center; justify-content: center;
      padding: 40px;
    }
    .login-card { width: 100%; max-width: 380px; }
    .login-header {
      margin-bottom: 32px;
      h2 { font-size: 28px; font-weight: 700; }
      p  { color: var(--text-secondary); margin-top: 6px; font-size: 14px; }
    }

    .login-form { display: flex; flex-direction: column; gap: 20px; }
    .input-wrapper {
      position: relative;
      .input-icon {
        position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
        color: var(--text-muted); z-index: 1; pointer-events: none;
      }
      .form-control { padding-left: 42px; padding-right: 42px; }
      .toggle-pass {
        position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
        background: none; border: none; cursor: pointer;
        color: var(--text-muted); display: flex;
        &:hover { color: var(--text-primary); }
      }
    }

    .error-msg {
      background: rgba(224,82,96,0.1); border: 1px solid rgba(224,82,96,0.3);
      border-radius: var(--radius-sm); padding: 10px 14px;
      color: var(--danger); font-size: 13px;
    }

    .login-btn {
      width: 100%; justify-content: center;
      height: 46px; font-size: 15px;
      background: linear-gradient(135deg, var(--primary), var(--primary-dark));
      box-shadow: 0 4px 20px rgba(108,92,231,0.3);
      &:hover { box-shadow: 0 6px 24px rgba(108,92,231,0.5); transform: translateY(-1px); }
    }
    .spinner-sm {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff; border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }
    .hint-text {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; color: var(--text-muted); margin-top: 4px;
    }

    @media (max-width: 900px) {
      .login-left { display: none; }
      .login-right { width: 100%; }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  showPass = false;
  loading = false;
  error = '';

  features = [
    { icon: '📊', text: 'Real-time transaction monitoring & analytics' },
    { icon: '🔐', text: 'Complete audit trail with MongoDB log storage' },
    { icon: '⚙️', text: 'Full financial configuration (commissions, limits)' },
    { icon: '👥', text: 'User & account lifecycle management' },
    { icon: '🌍', text: 'Multi-currency & multi-country support' },
  ];

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/admin/dashboard']);
  }

  login(): void {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please enter your email and password.';
      return;
    }
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/admin/dashboard']),
      error: () => { this.error = 'Invalid credentials.'; this.loading = false; }
    });
  }
}
