import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.collapsed]="collapsed">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="22" fill="url(#grad)"/>
            <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
                  font-size="52" font-weight="800" fill="white">P</text>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stop-color="#6c5ce7"/>
                <stop offset="100%" stop-color="#a29bfe"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span class="logo-text" *ngIf="!collapsed">PayOn<span class="accent">Admin</span></span>
        <button class="collapse-btn" (click)="toggleCollapse()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline *ngIf="!collapsed" points="15 18 9 12 15 6"/>
            <polyline *ngIf="collapsed"  points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <div class="nav-section" *ngFor="let section of sections">
          <span class="nav-section-label" *ngIf="!collapsed">{{ section.label }}</span>
          <a *ngFor="let item of section.items"
             [routerLink]="item.route"
             routerLinkActive="active"
             class="nav-item"
             [title]="collapsed ? item.label : ''">
            <span class="nav-icon" [innerHTML]="item.icon"></span>
            <span class="nav-label" *ngIf="!collapsed">{{ item.label }}</span>
            <span class="nav-badge" *ngIf="item.badge && !collapsed">{{ item.badge }}</span>
          </a>
        </div>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      background: var(--bg-sidebar);
      border-right: 1px solid var(--border);
      height: 100vh;
      display: flex; flex-direction: column;
      position: fixed; top: 0; left: 0; z-index: 100;
      transition: width var(--transition);
      overflow: hidden;
    }
    .sidebar.collapsed { width: 68px; }

    .sidebar-logo {
      display: flex; align-items: center; gap: 12px;
      padding: 18px 16px;
      border-bottom: 1px solid var(--border);
      min-height: var(--header-height);
      flex-shrink: 0;
    }
    .logo-icon { flex-shrink: 0; }
    .logo-text {
      font-size: 18px; font-weight: 700;
      white-space: nowrap; flex: 1;
      .accent { color: var(--primary-light); }
    }
    .collapse-btn {
      background: none; border: none;
      color: var(--text-muted); cursor: pointer;
      display: flex; padding: 4px;
      margin-left: auto; border-radius: 6px;
      &:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }
    }

    .sidebar-nav {
      flex: 1; overflow-y: auto; overflow-x: hidden;
      padding: 12px 8px;
      display: flex; flex-direction: column; gap: 4px;
    }

    .nav-section { margin-bottom: 8px; }
    .nav-section-label {
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--text-muted); padding: 8px 10px 4px;
      display: block; white-space: nowrap;
    }

    .nav-item {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px; font-weight: 500;
      transition: all var(--transition);
      cursor: pointer; white-space: nowrap;
      position: relative;

      &:hover {
        background: rgba(108,92,231,0.1);
        color: var(--text-primary);
        .nav-icon { color: var(--primary-light); }
      }
      &.active {
        background: linear-gradient(90deg, rgba(108,92,231,0.2), rgba(108,92,231,0.05));
        color: var(--primary-light);
        border-left: 2px solid var(--primary);
        .nav-icon { color: var(--primary-light); }
      }
    }
    .nav-icon { font-size: 16px; flex-shrink: 0; color: var(--text-muted); line-height: 1; }
    .nav-label { flex: 1; }
    .nav-badge {
      background: var(--danger); color: #fff;
      font-size: 10px; font-weight: 700;
      padding: 2px 6px; border-radius: 10px;
    }

    .sidebar.collapsed .sidebar-nav { padding: 12px 6px; }
    .sidebar.collapsed .nav-item { padding: 10px; justify-content: center; }
    .sidebar.collapsed .collapse-btn { margin-left: 0; }
  `]
})
export class SidebarComponent {
  @Output() collapsedChange = new EventEmitter<boolean>();
  collapsed = false;

  sections = [
    {
      label: 'Overview',
      items: [
        { label: 'Dashboard', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>', route: '/admin/dashboard' },
      ]
    },
    {
      label: 'Management',
      items: [
        { label: 'Users', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', route: '/admin/users' },
        { label: 'Accounts', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>', route: '/admin/accounts' },
        { label: 'Transactions', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>', route: '/admin/transactions' },
      ]
    },
    {
      label: 'Audit & Compliance',
      items: [
        { label: 'Audit Logs', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>', route: '/admin/audit-logs' },
        { label: 'OTP Logs', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>', route: '/admin/otp-logs' },
      ]
    },
    {
      label: 'Financial Config',
      items: [
        { label: 'Commissions', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', route: '/admin/commissions' },
        { label: 'Limits', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>', route: '/admin/limits' },
        { label: 'Currencies', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', route: '/admin/currencies' },
      ]
    },
    {
      label: 'System',
      items: [
        { label: 'Service Types', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>', route: '/admin/service-types' },
        { label: 'Countries', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', route: '/admin/countries' },
        { label: 'Account Types', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', route: '/admin/account-types' },
        { label: 'Invitations', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>', route: '/admin/invitations' },
      ]
    }
  ];

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
