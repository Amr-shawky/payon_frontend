import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="header-left">
        <h2 class="page-name">{{ pageTitle }}</h2>
        <div class="breadcrumb">
          <span>Admin</span>
          <span class="sep">›</span>
          <span class="current">{{ pageTitle }}</span>
        </div>
      </div>

      <div class="header-right">
        <!-- Notifications Bell -->
        <button class="header-btn" title="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="notif-dot"></span>
        </button>

        <!-- Current Date -->
        <div class="date-chip">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ today }}
        </div>

        <!-- User Profile -->
        <div class="user-menu" (click)="toggleMenu()" [class.open]="menuOpen">
          <div class="user-avatar">{{ initials }}</div>
          <div class="user-info">
            <span class="user-name">{{ user?.name }}</span>
            <span class="user-role">Administrator</span>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>

          <div class="dropdown" *ngIf="menuOpen" (click)="$event.stopPropagation()">
            <button class="dropdown-item danger" (click)="logout()">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: var(--header-height);
      background: var(--bg-sidebar);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 28px;
      position: sticky; top: 0; z-index: 50;
    }
    .header-left {
      h2 { font-size: 20px; font-weight: 700; }
    }
    .breadcrumb {
      font-size: 12px; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      margin-top: 2px;
      .sep { opacity: 0.4; }
      .current { color: var(--primary-light); }
    }
    .header-right { display: flex; align-items: center; gap: 12px; }

    .header-btn {
      width: 38px; height: 38px;
      background: transparent; border: 1px solid var(--border);
      border-radius: 10px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--text-secondary);
      position: relative;
      transition: all var(--transition);
      &:hover { border-color: var(--primary); color: var(--primary-light); }
    }
    .notif-dot {
      position: absolute; top: 8px; right: 8px;
      width: 7px; height: 7px;
      background: var(--danger); border-radius: 50%;
      border: 1px solid var(--bg-sidebar);
    }

    .date-chip {
      display: flex; align-items: center; gap: 6px;
      padding: 7px 12px;
      background: rgba(108,92,231,0.08);
      border: 1px solid var(--border);
      border-radius: 10px;
      font-size: 13px; color: var(--text-secondary);
    }

    .user-menu {
      display: flex; align-items: center; gap: 10px;
      padding: 6px 12px 6px 6px;
      border: 1px solid var(--border);
      border-radius: 40px; cursor: pointer;
      position: relative;
      transition: all var(--transition);
      &:hover, &.open { border-color: var(--primary-light); }
    }
    .user-avatar {
      width: 32px; height: 32px;
      background: linear-gradient(135deg, var(--primary), var(--primary-light));
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: #fff;
      flex-shrink: 0;
    }
    .user-info { display: flex; flex-direction: column; line-height: 1.2; }
    .user-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
    .user-role { font-size: 11px; color: var(--primary-light); }

    .dropdown {
      position: absolute; top: calc(100% + 8px); right: 0;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      min-width: 160px;
      box-shadow: var(--shadow);
      overflow: hidden;
      z-index: 200;
      animation: slideUp 0.15s ease;
    }
    .dropdown-item {
      width: 100%;
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px;
      background: none; border: none;
      font-size: 14px; cursor: pointer;
      color: var(--text-secondary);
      transition: all var(--transition);
      font-family: 'Inter', sans-serif;
      &:hover { background: rgba(255,255,255,0.05); color: var(--text-primary); }
      &.danger { color: var(--danger); &:hover { background: rgba(224,82,96,0.1); } }
    }
  `]
})
export class HeaderComponent {
  @Input() pageTitle = 'Dashboard';
  menuOpen = false;

  constructor(private auth: AuthService, private router: Router) {}

  get user() { return this.auth.getCurrentUser(); }
  get initials() {
    const name = this.user?.name ?? 'Admin';
    return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();
  }
  get today() {
    return new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', year:'numeric' });
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  logout() {
    this.menuOpen = false;
    this.auth.logout();
  }
}
