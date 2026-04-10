import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-limits',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Transaction Limits</h1>
        <p>Configure limit types, groups and their values per account group</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">+ New Limit</button>
      </div>
    </div>

    <div class="grid-3 mb-24">
      <!-- Limit Types -->
      <div class="card" style="padding:0">
        <div class="section-header">Limit Types <button class="btn btn-primary btn-sm">+</button></div>
        <div *ngIf="!loading">
          <div class="list-item" *ngFor="let lt of limitTypes">
            <div>
              <div class="fw-600 fs-14">{{ lt.type }}</div>
              <div class="fs-12 text-muted">{{ lt.description }}</div>
            </div>
            <span class="badge" [class.badge-success]="lt.isActive" [class.badge-danger]="!lt.isActive">
              {{ lt.isActive ? 'Active' : 'Off' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Limit Groups -->
      <div class="card" style="padding:0">
        <div class="section-header">Limit Groups <button class="btn btn-primary btn-sm">+</button></div>
        <div *ngIf="!loading">
          <div class="list-item" *ngFor="let lg of limitGroups">
            <div>
              <div class="fw-600 fs-14">{{ lg.name }}</div>
              <div class="fs-12 text-muted">{{ lg.accountCount | number }} accounts</div>
            </div>
            <div class="d-flex gap-8 align-center">
              <span class="badge badge-primary" *ngIf="lg.isDefault">Default</span>
              <span class="badge" [class.badge-success]="lg.isActive" [class.badge-danger]="!lg.isActive">
                {{ lg.isActive ? 'Active' : 'Off' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Limits -->
      <div class="card" style="padding:0">
        <div class="section-header">Limit Values</div>
        <div *ngIf="!loading">
          <div class="list-item" *ngFor="let l of limits">
            <div>
              <div class="fw-600 fs-14">{{ l.limitTypeName }}</div>
              <div class="fs-12 text-muted">{{ l.limitGroupName }}</div>
            </div>
            <div class="text-right">
              <div class="fw-700 text-primary" style="font-size:16px">{{ l.value | number }}</div>
              <div class="fs-12 text-muted">SAR</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
  `,
  styles: [`
    .section-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 20px; border-bottom: 1px solid var(--border);
      font-size: 14px; font-weight: 600;
    }
    .list-item {
      display: flex; align-items: center; justify-content: space-between;
      padding: 14px 20px; border-bottom: 1px solid var(--border);
      &:last-child { border-bottom: none; }
    }
  `]
})
export class LimitsComponent implements OnInit {
  limitTypes: any[] = [];
  limitGroups: any[] = [];
  limits: any[] = [];
  loading = true;

  constructor(private mock: MockDataService) {}
  ngOnInit() {
    this.mock.getLimitTypes().subscribe(d => { this.limitTypes = d; this.tryDone(); });
    this.mock.getLimitGroups().subscribe(d => { this.limitGroups = d; this.tryDone(); });
    this.mock.getLimits().subscribe(d => { this.limits = d; this.tryDone(); });
  }
  private loadedCount = 0;
  tryDone() { if (++this.loadedCount >= 3) this.loading = false; }
}
