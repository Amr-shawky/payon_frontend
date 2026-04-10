import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="admin-shell" [class.sidebar-collapsed]="sidebarCollapsed">
      <app-sidebar (collapsedChange)="sidebarCollapsed = $event"/>
      <div class="main-area">
        <app-header [pageTitle]="pageTitle"/>
        <main class="main-content">
          <router-outlet/>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .admin-shell {
      display: flex; min-height: 100vh;
      --sidebar-current: var(--sidebar-width);
      transition: --sidebar-current var(--transition);
    }
    .admin-shell.sidebar-collapsed { --sidebar-current: 68px; }

    .main-area {
      margin-left: var(--sidebar-width);
      flex: 1;
      display: flex; flex-direction: column;
      min-width: 0;
      transition: margin-left var(--transition);
    }
    .admin-shell.sidebar-collapsed .main-area { margin-left: 68px; }

    .main-content {
      flex: 1;
      padding: 28px;
      overflow-y: auto;
    }
  `]
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;
  pageTitle = 'Dashboard';

  private titleMap: Record<string, string> = {
    'dashboard':    'Dashboard',
    'users':        'User Management',
    'accounts':     'Account Management',
    'transactions': 'Transactions',
    'audit-logs':   'Audit Logs',
    'commissions':  'Commissions',
    'limits':       'Transaction Limits',
    'currencies':   'Currencies',
    'countries':    'Countries & Cities',
    'account-types':'Account Types',
    'invitations':  'Invitation System',
    'otp-logs':     'OTP Logs',
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const seg = e.urlAfterRedirects?.split('/').pop()?.split('?')[0] ?? '';
        this.pageTitle = this.titleMap[seg] ?? 'Admin';
      });
  }
}
