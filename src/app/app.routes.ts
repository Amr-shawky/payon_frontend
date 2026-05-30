import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'accounts',
        loadComponent: () => import('./features/accounts/accounts.component').then(m => m.AccountsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./features/transactions/transactions.component').then(m => m.TransactionsComponent)
      },
      {
        path: 'audit-logs',
        loadComponent: () => import('./features/audit-logs/audit-logs.component').then(m => m.AuditLogsComponent)
      },
      {
        path: 'commissions',
        loadComponent: () => import('./features/commissions/commissions.component').then(m => m.CommissionsComponent)
      },
      {
        path: 'limits',
        loadComponent: () => import('./features/limits/limits.component').then(m => m.LimitsComponent)
      },
      {
        path: 'currencies',
        loadComponent: () => import('./features/currencies/currencies.component').then(m => m.CurrenciesComponent)
      },
      {
        path: 'countries',
        loadComponent: () => import('./features/countries/countries.component').then(m => m.CountriesComponent)
      },
      {
        path: 'invitations',
        loadComponent: () => import('./features/invitations/invitations.component').then(m => m.InvitationsComponent)
      },
      {
        path: 'otp-logs',
        loadComponent: () => import('./features/otp-logs/otp-logs.component').then(m => m.OtpLogsComponent)
      },
      {
        path: 'service-types',
        loadComponent: () => import('./features/service-types/service-types.component').then(m => m.ServiceTypesComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'admin/dashboard' }
];
