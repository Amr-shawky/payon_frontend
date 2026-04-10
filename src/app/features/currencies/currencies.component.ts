import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Currencies</h1>
        <p>Manage supported currencies and their exchange rates</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">+ Add Currency</button>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
      <div class="data-table-wrapper" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th><th>Name (EN / AR)</th><th>Country</th>
              <th>Exchange Rate</th><th>Status</th><th>Created</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of currencies">
              <td><span class="badge badge-info" style="font-size:14px;padding:5px 14px">{{ c.code }}</span></td>
              <td>
                <div class="fw-600">{{ c.name }}</div>
                <div class="fs-12 text-muted">{{ c.arName }}</div>
              </td>
              <td>{{ c.countryName }}</td>
              <td>
                <span class="fw-700" style="font-size:16px;color:var(--secondary)">{{ c.exchangeRate }}</span>
                <span class="fs-12 text-muted"> SAR</span>
              </td>
              <td>
                <span class="badge" [class.badge-success]="c.isActive" [class.badge-danger]="!c.isActive">
                  {{ c.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="fs-13 text-muted">{{ c.createdAt | date:'mediumDate' }}</td>
              <td>
                <div class="d-flex gap-8">
                  <button class="btn btn-ghost btn-sm">Edit Rate</button>
                  <button class="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class CurrenciesComponent implements OnInit {
  currencies: any[] = [];
  loading = true;
  constructor(private mock: MockDataService) {}
  ngOnInit() { this.mock.getCurrencies().subscribe(r => { this.currencies = r.items; this.loading = false; }); }
}
