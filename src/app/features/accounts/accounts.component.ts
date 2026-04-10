import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';
import { AccountDetailsList } from '../../core/models/models';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Account Management</h1>
        <p>Manage all financial accounts, wallets, and KYC compliance</p>
      </div>
      <div class="page-actions">
        <span class="badge badge-info">{{ totalCount | number }} accounts</span>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-input filter-item">
        <input class="form-control" [(ngModel)]="search" (ngModelChange)="onSearch()" placeholder="🔍  Search by IPA, user, currency..."/>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterState" (change)="onSearch()">
          <option value="">All States</option>
          <option>Approved</option><option>Pending</option><option>Rejected</option>
        </select>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterActive" (change)="onSearch()">
          <option value="">All Status</option>
          <option value="true">Active</option><option value="false">Inactive</option>
        </select>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="data-table-wrapper" *ngIf="!loading; else skel">
        <table class="data-table">
          <thead>
            <tr>
              <th>Account (IPA)</th><th>Balance</th><th>Currency</th>
              <th>Type</th><th>Owner</th><th>KYC Status</th>
              <th>Active</th><th>Created</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let a of accounts">
              <td>
                <div class="fw-600 text-primary">{{ a.ipa }}</div>
                <div class="fs-12 text-muted">{{ a.id.substring(0,8) }}...</div>
              </td>
              <td class="fw-600">{{ a.balance | number:'1.2-2' }}</td>
              <td><span class="badge badge-info">{{ a.currencyCode }}</span></td>
              <td>{{ a.accountTypeName }}</td>
              <td>
                <div class="fw-600 fs-13">{{ a.userName }}</div>
                <div class="fs-12 text-muted">{{ a.userEmail }}</div>
              </td>
              <td><span class="badge" [ngClass]="stateBadge(a.state)">{{ a.state }}</span></td>
              <td>
                <span class="badge" [class.badge-success]="a.isActive" [class.badge-danger]="!a.isActive">
                  {{ a.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="fs-13 text-muted">{{ a.createdAt | date:'mediumDate' }}</td>
              <td>
                <div class="d-flex gap-8">
                  <button class="btn btn-success btn-sm" *ngIf="a.state==='Pending'">Approve</button>
                  <button class="btn btn-danger btn-sm" *ngIf="a.state==='Pending'">Reject</button>
                  <button class="btn btn-ghost btn-sm">View</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #skel><div class="loading-overlay"><div class="spinner"></div></div></ng-template>
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
  styles: []
})
export class AccountsComponent implements OnInit {
  accounts: AccountDetailsList[] = [];
  loading = true;
  search = ''; filterState = ''; filterActive = '';
  page = 1; size = 10; totalCount = 0; totalPages = 1;

  constructor(private mock: MockDataService) {}
  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.mock.getAccounts(this.page, this.size, this.search).subscribe(r => {
      let items = r.items;
      if (this.filterState) items = items.filter(a => a.state === this.filterState);
      if (this.filterActive !== '') items = items.filter(a => a.isActive === (this.filterActive === 'true'));
      this.accounts = items;
      this.totalCount = r.totalCount;
      this.totalPages = r.totalPages;
      this.loading = false;
    });
  }
  onSearch() { this.page = 1; this.load(); }
  goPage(p: number) { this.page = p; this.load(); }
  min(a: number, b: number) { return Math.min(a, b); }
  stateBadge(s: string) {
    return { 'badge-success': s==='Approved', 'badge-danger': s==='Rejected', 'badge-warning': s==='Pending' };
  }
}
