import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';
import { TransactionGetter } from '../../core/models/models';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Transactions</h1>
        <p>Monitor all financial transactions across the platform</p>
      </div>
      <div class="page-actions">
        <div class="d-flex gap-8">
          <span class="badge badge-success">{{ summary?.totalTransactions | number }} Total</span>
          <span class="badge badge-info">{{ summary?.successRate }}% Success Rate</span>
          <span class="badge badge-warning">{{ summary?.totalVolume | number:'1.0-0' }} SAR Volume</span>
        </div>
      </div>
    </div>

    <div class="filters-bar">
      <div class="search-input filter-item">
        <input class="form-control" [(ngModel)]="search" (ngModelChange)="onSearch()"
               placeholder="Search by IPA, type, status..."/>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterStatus" (change)="onSearch()">
          <option value="">All Status</option>
          <option>Completed</option><option>Pending</option><option>Failed</option><option>Cancelled</option>
        </select>
      </div>
      <div class="filter-item">
        <select class="form-control" [(ngModel)]="filterType" (change)="onSearch()">
          <option value="">All Types</option>
          <option>Transfer</option><option>Payment</option>
          <option>Exchange</option><option>Merchant Payment</option>
        </select>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="data-table-wrapper" *ngIf="!loading; else skel">
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th><th>Type</th><th>Sender → Receiver</th>
              <th>Amount</th><th>Fee</th><th>Net</th>
              <th>Currency</th><th>Status</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let t of transactions">
              <td class="text-muted fs-13">{{ t.id }}</td>
              <td><span class="badge badge-primary">{{ t.transactionType }}</span></td>
              <td>
                <div class="fs-13">
                  <span class="fw-600 text-primary">{{ t.senderIpa }}</span>
                  <span class="text-muted"> → </span>
                  <span class="fw-600">{{ t.receiverIpa }}</span>
                </div>
                <div class="fs-12 text-muted">{{ t.description }}</div>
              </td>
              <td class="fw-600">{{ t.amount | number:'1.2-2' }}</td>
              <td class="fs-13 text-muted">{{ t.fee | number:'1.2-2' }}</td>
              <td class="fw-600 text-success">{{ t.netAmount | number:'1.2-2' }}</td>
              <td><span class="badge badge-muted">{{ t.currencyCode }}</span></td>
              <td><span class="badge" [ngClass]="statusBadge(t.status)">{{ t.status }}</span></td>
              <td class="fs-13 text-muted">{{ t.createdAt | date:'short' }}</td>
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
export class TransactionsComponent implements OnInit {
  transactions: TransactionGetter[] = [];
  summary: any;
  loading = true;
  search = ''; filterStatus = ''; filterType = '';
  page = 1; size = 10; totalCount = 0; totalPages = 1;

  constructor(private mock: MockDataService) {}
  ngOnInit() {
    this.mock.getTransactionSummary().subscribe(d => this.summary = d);
    this.load();
  }
  load() {
    this.loading = true;
    this.mock.getTransactions(this.page, this.size, this.search).subscribe(r => {
      let items = r.items;
      if (this.filterStatus) items = items.filter(t => t.status === this.filterStatus);
      if (this.filterType)   items = items.filter(t => t.transactionType === this.filterType);
      this.transactions = items;
      this.totalCount = r.totalCount;
      this.totalPages = r.totalPages;
      this.loading = false;
    });
  }
  onSearch() { this.page = 1; this.load(); }
  goPage(p: number) { this.page = p; this.load(); }
  min(a: number, b: number) { return Math.min(a, b); }
  statusBadge(s: string) {
    return { 'badge-success': s==='Completed', 'badge-danger': s==='Failed', 'badge-warning': s==='Pending', 'badge-muted': s==='Cancelled' };
  }
}
