import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';
import { DashboardStats, UsersSummaryDto, TransactionSummaryResponse, MonthlyTransactionStat, TransactionStateStat, PaymentMethodTransactionsResponse, ActivityLog } from '../../core/models/models';
import { Chart, registerables } from 'chart.js';
import { IconComponent } from '../../shared/components/icon/icon.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="dashboard">

      <!-- KPI Grid -->
      <div class="grid-4 mb-24">
        <div class="stat-card primary">
          <div class="stat-icon primary"><app-icon name="users"/></div>
          <div class="stat-content">
            <div class="stat-value">{{ stats?.totalUsers | number }}</div>
            <div class="stat-label">Total Users</div>
            <div class="stat-change up">▲ +1,203 this month</div>
          </div>
        </div>
        <div class="stat-card success">
          <div class="stat-icon success"><app-icon name="wallet"/></div>
          <div class="stat-content">
            <div class="stat-value">{{ stats?.totalAccounts | number }}</div>
            <div class="stat-label">Total Accounts</div>
            <div class="stat-change up">▲ {{ stats?.activeAccounts | number }} active</div>
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon warning"><app-icon name="refresh"/></div>
          <div class="stat-content">
            <div class="stat-value">{{ stats?.totalTransactions | number }}</div>
            <div class="stat-label">Transactions</div>
            <div class="stat-change up">▲ {{ summary?.successRate }}% success</div>
          </div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon info"><app-icon name="money"/></div>
          <div class="stat-content">
            <div class="stat-value">{{ (stats?.totalVolume ?? 0) | number:'1.0-0' }} SAR</div>
            <div class="stat-label">Total Volume</div>
            <div class="stat-change up">▲ Fees: {{ (stats?.totalRevenue ?? 0) | number:'1.0-0' }} SAR</div>
          </div>
        </div>
      </div>

      <!-- User Status Row -->
      <div class="grid-4 mb-24" *ngIf="userSummary">
        <div class="mini-stat">
          <div class="ms-label">Active Users</div>
          <div class="ms-val success">{{ userSummary.activeUsers | number }}</div>
        </div>
        <div class="mini-stat">
          <div class="ms-label">Inactive Users</div>
          <div class="ms-val danger">{{ userSummary.inactiveUsers | number }}</div>
        </div>
        <div class="mini-stat">
          <div class="ms-label">Pending Users</div>
          <div class="ms-val warning">{{ userSummary.pendingUsers | number }}</div>
        </div>
        <div class="mini-stat">
          <div class="ms-label">Pending Accounts</div>
          <div class="ms-val warning">{{ stats?.pendingAccounts | number }}</div>
        </div>
      </div>

      <!-- Charts Row 1 -->
      <div class="grid-2 mb-24">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Monthly Transaction Volume</h3>
            <span>Last 7 months</span>
          </div>
          <canvas #monthlyChart height="180"></canvas>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Transaction States</h3>
            <span>Last 6 months</span>
          </div>
          <canvas #statesChart height="180"></canvas>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid-2 mb-24">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Payment Methods</h3>
            <span>Total volume by type</span>
          </div>
          <div class="doughnut-wrapper">
            <canvas #methodsChart height="200"></canvas>
          </div>
          <div class="methods-legend" *ngIf="paymentMethods">
            <div class="legend-item" *ngFor="let m of methodLegend">
              <span class="legend-dot" [style.background]="m.color"></span>
              <span class="legend-label">{{ m.label }}</span>
              <span class="legend-val">{{ m.value | number }}</span>
            </div>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <h3>Recent Activity</h3>
            <span>Last 6 audit events</span>
          </div>
          <div class="activity-feed" *ngIf="recentLogs.length">
            <div class="activity-item" *ngFor="let log of recentLogs">
              <div class="act-dot" [class.success]="log.isSuccessful" [class.danger]="!log.isSuccessful"></div>
              <div class="act-content">
                <div class="act-title">{{ log.fullName }}</div>
                <div class="act-desc">{{ log.actionDescription }}</div>
                <div class="act-meta">
                  <span class="badge" [class.badge-success]="log.isSuccessful" [class.badge-danger]="!log.isSuccessful">
                    {{ log.responseStatus }}
                  </span>
                  <span class="act-time">{{ log.timestamp | date:'short' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .mini-stat {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      display: flex; align-items: center; justify-content: space-between;
      .ms-label { font-size: 13px; color: var(--text-secondary); }
      .ms-val { font-size: 20px; font-weight: 700; }
      .ms-val.success { color: var(--secondary); }
      .ms-val.danger  { color: var(--danger); }
      .ms-val.warning { color: var(--warning); }
    }

    .doughnut-wrapper { display: flex; justify-content: center; }
    .methods-legend {
      display: flex; flex-direction: column; gap: 8px;
      margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);
    }
    .legend-item {
      display: flex; align-items: center; gap: 10px;
      font-size: 13px;
      .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
      .legend-label { flex: 1; color: var(--text-secondary); }
      .legend-val { font-weight: 600; color: var(--text-primary); }
    }

    .activity-feed { display: flex; flex-direction: column; gap: 12px; }
    .activity-item { display: flex; gap: 12px; align-items: flex-start; }
    .act-dot {
      width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
      &.success { background: var(--secondary); }
      &.danger  { background: var(--danger); }
    }
    .act-content { flex: 1; }
    .act-title { font-size: 13px; font-weight: 600; }
    .act-desc  { font-size: 12px; color: var(--text-secondary); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px; }
    .act-meta  { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
    .act-time  { font-size: 11px; color: var(--text-muted); }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('monthlyChart') monthlyChartRef!: ElementRef;
  @ViewChild('statesChart')  statesChartRef!:  ElementRef;
  @ViewChild('methodsChart') methodsChartRef!: ElementRef;

  stats?: DashboardStats;
  userSummary?: UsersSummaryDto;
  summary?: TransactionSummaryResponse;
  monthlyStats: MonthlyTransactionStat[] = [];
  statesStats: TransactionStateStat[] = [];
  paymentMethods?: PaymentMethodTransactionsResponse;
  recentLogs: ActivityLog[] = [];

  methodLegend = [
    { label: 'Wallet',  color: '#6c5ce7', value: 0 },
    { label: 'Card',    color: '#00b894', value: 0 },
    { label: 'Bank',    color: '#0984e3', value: 0 },
    { label: 'QR Code', color: '#fdcb6e', value: 0 },
    { label: 'Online',  color: '#e05260', value: 0 },
  ];

  private chartsReady = false;
  private dataReady = { monthly: false, states: false, methods: false };

  constructor(private mock: MockDataService) {}

  ngOnInit(): void {
    this.mock.getDashboardStats().subscribe(d => { this.stats = d; });
    this.mock.getUsersSummary().subscribe(d => { this.userSummary = d; });
    this.mock.getTransactionSummary().subscribe(d => { this.summary = d; });
    this.mock.getMonthlyStats().subscribe(d => {
      this.monthlyStats = d;
      this.dataReady.monthly = true;
      this.tryRenderCharts();
    });
    this.mock.getStatesLastSixMonths().subscribe(d => {
      this.statesStats = d;
      this.dataReady.states = true;
      this.tryRenderCharts();
    });
    this.mock.getPaymentMethods().subscribe(d => {
      this.paymentMethods = d;
      this.methodLegend[0].value = d.wallet;
      this.methodLegend[1].value = d.card;
      this.methodLegend[2].value = d.bank;
      this.methodLegend[3].value = d.qr;
      this.methodLegend[4].value = d.online;
      this.dataReady.methods = true;
      this.tryRenderCharts();
    });
    this.mock.getActivityLogs(1, 6).subscribe(d => { this.recentLogs = d.items; });
  }

  ngAfterViewInit(): void {
    this.chartsReady = true;
    this.tryRenderCharts();
  }

  private tryRenderCharts(): void {
    if (!this.chartsReady) return;
    if (this.dataReady.monthly) this.renderMonthly();
    if (this.dataReady.states)  this.renderStates();
    if (this.dataReady.methods) this.renderMethods();
  }

  private renderMonthly(): void {
    new Chart(this.monthlyChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.monthlyStats.map(s => s.month),
        datasets: [{
          label: 'Volume (SAR)',
          data: this.monthlyStats.map(s => s.volume),
          borderColor: '#6c5ce7',
          backgroundColor: 'rgba(108,92,231,0.08)',
          tension: 0.4, fill: true, pointBackgroundColor: '#6c5ce7'
        }, {
          label: 'Transactions',
          data: this.monthlyStats.map(s => s.count),
          borderColor: '#00b894',
          backgroundColor: 'rgba(0,184,148,0.08)',
          tension: 0.4, fill: true, pointBackgroundColor: '#00b894',
          yAxisID: 'y1'
        }]
      },
      options: { responsive: true, plugins: { legend: { labels: { color: '#a0a0c0' } } },
        scales: {
          x: { ticks: { color: '#606080' }, grid: { color: 'rgba(108,92,231,0.06)' } },
          y: { ticks: { color: '#606080' }, grid: { color: 'rgba(108,92,231,0.06)' } },
          y1: { position: 'right', ticks: { color: '#606080' }, grid: { drawOnChartArea: false } }
        }
      }
    });
  }

  private renderStates(): void {
    new Chart(this.statesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.statesStats.map(s => s.month),
        datasets: [
          { label: 'Completed', data: this.statesStats.map(s => s.completed), backgroundColor: 'rgba(0,184,148,0.7)', borderRadius: 4 },
          { label: 'Pending',   data: this.statesStats.map(s => s.pending),   backgroundColor: 'rgba(253,203,110,0.7)', borderRadius: 4 },
          { label: 'Failed',    data: this.statesStats.map(s => s.failed),    backgroundColor: 'rgba(224,82,96,0.7)', borderRadius: 4 },
          { label: 'Cancelled', data: this.statesStats.map(s => s.cancelled), backgroundColor: 'rgba(96,96,128,0.7)', borderRadius: 4 },
        ]
      },
      options: {
        responsive: true, plugins: { legend: { labels: { color: '#a0a0c0' } } },
        scales: {
          x: { stacked: true, ticks: { color: '#606080' }, grid: { color: 'rgba(108,92,231,0.06)' } },
          y: { stacked: true, ticks: { color: '#606080' }, grid: { color: 'rgba(108,92,231,0.06)' } }
        }
      }
    });
  }

  private renderMethods(): void {
    const m = this.paymentMethods!;
    new Chart(this.methodsChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Wallet', 'Card', 'Bank', 'QR', 'Online'],
        datasets: [{ data: [m.wallet, m.card, m.bank, m.qr, m.online],
          backgroundColor: ['#6c5ce7','#00b894','#0984e3','#fdcb6e','#e05260'],
          borderWidth: 0, hoverOffset: 8 }]
      },
      options: {
        responsive: true, cutout: '70%',
        plugins: { legend: { display: false } }
      }
    });
  }
}
