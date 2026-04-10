import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';
import { ActivityLog } from '../../core/models/models';

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Audit Logs</h1>
        <p>Complete activity trail for every action taken in the system (MongoDB)</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-danger btn-sm">🗑 Clear All Logs</button>
        <span class="badge badge-info">{{ totalCount | number }} events recorded</span>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-input filter-item">
        <input class="form-control" [(ngModel)]="search" (ngModelChange)="onSearch()"
               placeholder="🔍  Search by user, action, IP..."/>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterMethod" (change)="onSearch()">
          <option value="">All Methods</option>
          <option>GET</option><option>POST</option><option>PUT</option><option>PATCH</option><option>DELETE</option>
        </select>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterSuccess" (change)="onSearch()">
          <option value="">All Results</option>
          <option value="true">Successful</option>
          <option value="false">Failed</option>
        </select>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="data-table-wrapper" *ngIf="!loading; else skel">
        <table class="data-table">
          <thead>
            <tr>
              <th>Timestamp</th><th>User</th><th>Role</th>
              <th>Action</th><th>Method</th>
              <th>Status</th><th>IP / Location</th><th>Device</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let log of logs">
              <td class="fs-13 text-muted" style="white-space:nowrap">{{ log.timestamp | date:'short' }}</td>
              <td>
                <div class="fw-600 fs-13">{{ log.fullName || 'Anonymous' }}</div>
                <div class="fs-12 text-muted">{{ log.userEmail }}</div>
              </td>
              <td><span class="badge" [ngClass]="roleBadge(log.userRole)">{{ log.userRole }}</span></td>
              <td>
                <div class="fs-13" style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                  {{ log.actionDescription }}
                </div>
                <div class="fs-12 text-muted">{{ log.route }}</div>
              </td>
              <td>
                <span class="badge" [ngClass]="methodBadge(log.httpMethod)">{{ log.httpMethod }}</span>
              </td>
              <td>
                <span class="badge" [class.badge-success]="log.isSuccessful" [class.badge-danger]="!log.isSuccessful">
                  {{ log.responseStatus }}
                </span>
              </td>
              <td>
                <div class="fs-13">{{ log.ipAddress }}</div>
                <div class="fs-12 text-muted">{{ log.city }}, {{ log.country }}</div>
              </td>
              <td>
                <div class="fs-13">{{ log.browser }}</div>
                <div class="fs-12 text-muted">{{ log.deviceOS }} · {{ log.deviceType }}</div>
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
export class AuditLogsComponent implements OnInit {
  logs: ActivityLog[] = [];
  loading = true;
  search = ''; filterMethod = ''; filterSuccess = '';
  page = 1; size = 10; totalCount = 0; totalPages = 1;

  constructor(private mock: MockDataService) {}
  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.mock.getActivityLogs(this.page, this.size, this.search).subscribe(r => {
      let items = r.items;
      if (this.filterMethod) items = items.filter(l => l.httpMethod === this.filterMethod);
      if (this.filterSuccess !== '') items = items.filter(l => l.isSuccessful === (this.filterSuccess === 'true'));
      this.logs = items;
      this.totalCount = r.totalCount;
      this.totalPages = r.totalPages;
      this.loading = false;
    });
  }
  onSearch() { this.page = 1; this.load(); }
  goPage(p: number) { this.page = p; this.load(); }
  min(a: number, b: number) { return Math.min(a, b); }

  roleBadge(r: string) {
    return { 'badge-primary': r==='Admin', 'badge-warning': r==='Merchant', 'badge-muted': r==='User' || r==='Anonymous' };
  }
  methodBadge(m: string) {
    return { 'badge-success': m==='GET', 'badge-warning': m==='POST'||m==='PUT'||m==='PATCH', 'badge-danger': m==='DELETE', 'badge-info': m==='OPTIONS' };
  }
}
