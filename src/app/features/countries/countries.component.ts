import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Countries & Cities</h1>
        <p>Manage supported countries, city data and phone codes</p>
      </div>
      <div class="page-actions">
        <button class="btn btn-primary">+ Add Country</button>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
      <div class="data-table-wrapper" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr>
              <th>Flag</th><th>ISO</th><th>Name (EN / AR)</th><th>Code</th>
              <th>Phone Code</th><th>Num Code</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of countries">
              <td style="font-size:28px">{{ flag(c.iso) }}</td>
              <td><span class="badge badge-muted">{{ c.iso }}</span></td>
              <td>
                <div class="fw-600">{{ c.name }}</div>
                <div class="fs-12 text-muted">{{ c.arName }}</div>
              </td>
              <td class="fs-13 text-muted">{{ c.code }}</td>
              <td><span class="text-primary fw-600">+{{ c.phoneCode }}</span></td>
              <td class="fs-13 text-muted">{{ c.numCode }}</td>
              <td>
                <span class="badge" [class.badge-success]="c.isActive" [class.badge-danger]="!c.isActive">
                  {{ c.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <div class="d-flex gap-8">
                  <button class="btn btn-ghost btn-sm">Edit</button>
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
export class CountriesComponent implements OnInit {
  countries: any[] = [];
  loading = true;
  constructor(private mock: MockDataService) {}
  ngOnInit() { this.mock.getCountries().subscribe(r => { this.countries = r.items; this.loading = false; }); }
  flag(iso: string) {
    const off = 127397;
    return [...iso.toUpperCase()].map(c => String.fromCodePoint(c.charCodeAt(0) + off)).join('');
  }
}
