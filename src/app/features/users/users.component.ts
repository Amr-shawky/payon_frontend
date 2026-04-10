import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';
import { UserResponse } from '../../core/models/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>User Management</h1>
        <p>View and manage all registered users in the system</p>
      </div>
      <div class="page-actions">
        <span class="badge badge-info">{{ totalCount | number }} total users</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar">
      <div class="search-input filter-item">
        <input class="form-control" [(ngModel)]="search" (ngModelChange)="onSearch()"
               placeholder="🔍  Search by name, email, phone..."/>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterRole" (change)="onSearch()">
          <option value="">All Roles</option>
          <option>User</option><option>Merchant</option><option>Admin</option>
        </select>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterState" (change)="onSearch()">
          <option value="">All States</option>
          <option>Active</option><option>Inactive</option><option>Pending</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding:0">
      <div class="data-table-wrapper" *ngIf="!loading; else skeleton">
        <table class="data-table">
          <thead>
            <tr>
              <th>User</th><th>Phone</th><th>Role</th>
              <th>Country</th><th>Account Type</th>
              <th>Joined</th><th>State</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of users">
              <td>
                <div class="d-flex align-center gap-12">
                  <div class="avatar">{{ initials(u.name) }}</div>
                  <div>
                    <div class="fw-600">{{ u.name }}</div>
                    <div class="fs-12 text-muted">{{ u.email }}</div>
                  </div>
                </div>
              </td>
              <td>{{ u.phoneNumber }}</td>
              <td><span class="badge" [ngClass]="roleBadge(u.role)">{{ u.role }}</span></td>
              <td>{{ u.countryName }}</td>
              <td>{{ u.accountType }}</td>
              <td class="fs-13 text-muted">{{ u.createdAt | date:'mediumDate' }}</td>
              <td>
                <span class="badge" [ngClass]="stateBadge(u.state)">{{ u.state }}</span>
              </td>
              <td>
                <div class="d-flex gap-8">
                  <button class="btn btn-ghost btn-sm">View</button>
                  <button class="btn btn-ghost btn-sm" style="color:var(--warning)">Edit Role</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #skeleton>
        <div class="loading-overlay"><div class="spinner"></div></div>
      </ng-template>
      <div class="pagination">
        <span class="page-info">Showing {{ (page-1)*size+1 }}–{{ min(page*size, totalCount) }} of {{ totalCount }}</span>
        <div class="page-controls">
          <button class="page-btn" (click)="goPage(page-1)" [disabled]="page<=1">‹</button>
          <button class="page-btn active">{{ page }}</button>
          <button class="page-btn" (click)="goPage(page+1)" [disabled]="page>=totalPages">›</button>
        </div>
      </div>
    </div>
  `,
  styles: [`.avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-light));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0; }`]
})
export class UsersComponent implements OnInit {
  users: UserResponse[] = [];
  loading = true;
  search = ''; filterRole = ''; filterState = '';
  page = 1; size = 10; totalCount = 0; totalPages = 1;

  constructor(private mock: MockDataService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.mock.getUsers(this.page, this.size, this.search).subscribe(r => {
      let items = r.items;
      if (this.filterRole) items = items.filter(u => u.role === this.filterRole);
      if (this.filterState) items = items.filter(u => u.state === this.filterState);
      this.users = items;
      this.totalCount = r.totalCount;
      this.totalPages = r.totalPages;
      this.loading = false;
    });
  }

  onSearch() { this.page = 1; this.load(); }
  goPage(p: number) { this.page = p; this.load(); }
  min(a: number, b: number) { return Math.min(a, b); }
  initials(name: string) { return name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase(); }

  roleBadge(r: string) {
    return { 'badge-primary': r==='Admin', 'badge-warning': r==='Merchant', 'badge-muted': r==='User' };
  }
  stateBadge(s: string) {
    return { 'badge-success': s==='Active', 'badge-danger': s==='Inactive', 'badge-warning': s==='Pending' };
  }
}
