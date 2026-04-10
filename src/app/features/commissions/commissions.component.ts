import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { CommissionGroupListDto, CommissionDTO } from '../../core/models/models';

@Component({
  selector: 'app-commissions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Commissions</h1>
        <p>Manage commission groups and their fee rules per transaction type</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">+ New Commission Group</button>
      </div>
    </div>

    <div class="grid-2 mb-24">
      <!-- Groups -->
      <div class="card" style="padding:0">
        <div style="padding:20px 24px; border-bottom:1px solid var(--border)">
          <h3 style="font-size:15px">Commission Groups</h3>
        </div>
        <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
        <div *ngIf="!loading">
          <div class="group-item" *ngFor="let g of groups" (click)="selectGroup(g)" [class.selected]="selectedGroup?.id === g.id">
            <div class="gi-left">
              <div class="fw-600">{{ g.name }}</div>
              <div class="fs-12 text-muted">{{ g.description }}</div>
              <div class="d-flex gap-8 mt-8">
                <span class="badge badge-muted fs-12">{{ g.accountCount | number }} accounts</span>
                <span class="badge badge-muted fs-12">{{ g.commissionCount }} commissions</span>
                <span class="badge" [class.badge-success]="g.isActive" [class.badge-danger]="!g.isActive">
                  {{ g.isActive ? 'Active' : 'Inactive' }}
                </span>
                <span class="badge badge-primary" *ngIf="g.isDefault">Default</span>
              </div>
            </div>
            <div class="d-flex gap-8">
              <button class="btn btn-ghost btn-sm">Edit</button>
              <button class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Commissions in group -->
      <div class="card" style="padding:0">
        <div style="padding:20px 24px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center">
          <h3 style="font-size:15px">
            {{ selectedGroup ? selectedGroup.name + ' — Rates' : 'All Commission Rates' }}
          </h3>
          <button class="btn btn-primary btn-sm">+ Add Rate</button>
        </div>
        <div *ngIf="!loading">
          <table class="data-table">
            <thead>
              <tr><th>Transaction Type</th><th>Type</th><th>Value</th><th>Min</th><th>Max</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of commissions">
                <td class="fw-600">{{ c.transactionTypeName }}</td>
                <td>
                  <span class="badge" [class.badge-primary]="c.type==='Percentage'" [class.badge-warning]="c.type==='Fixed'">
                    {{ c.type }}
                  </span>
                </td>
                <td class="fw-600">{{ c.value }}{{ c.type==='Percentage' ? '%' : ' SAR' }}</td>
                <td class="fs-13 text-muted">{{ c.minAmount }}</td>
                <td class="fs-13 text-muted">{{ c.maxAmount }}</td>
                <td>
                  <div class="d-flex gap-8">
                    <button class="btn btn-ghost btn-sm">Edit</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .group-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
      cursor: pointer; transition: background var(--transition);
      &:last-child { border-bottom: none; }
      &:hover, &.selected { background: var(--bg-card-hover); }
    }
  `]
})
export class CommissionsComponent implements OnInit {
  groups: CommissionGroupListDto[] = [];
  commissions: CommissionDTO[] = [];
  selectedGroup?: CommissionGroupListDto;
  loading = true;

  constructor(private mock: MockDataService) {}
  ngOnInit() {
    this.mock.getCommissionGroups().subscribe(r => {
      this.groups = r.items;
      this.loading = false;
    });
    this.mock.getCommissions().subscribe(c => this.commissions = c);
  }
  selectGroup(g: CommissionGroupListDto) { this.selectedGroup = g; }
}
