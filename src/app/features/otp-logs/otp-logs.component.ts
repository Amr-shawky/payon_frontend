import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-otp-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>OTP Logs</h1>
        <p>Monitor all one-time passwords sent to users for verification</p>
      </div>
      <div class="page-actions">
        <span class="badge badge-info">{{ totalCount }} OTP records</span>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
      <div class="data-table-wrapper" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr><th>#</th><th>Sent To</th><th>Purpose</th><th>Used</th><th>Created At</th><th>Expires At</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let otp of otps; let i=index">
              <td class="text-muted">{{ i+1 }}</td>
              <td class="fw-600">{{ otp.emailOrPhone }}</td>
              <td>
                <span class="badge" [class.badge-warning]="otp.isForgotPassword" [class.badge-info]="!otp.isForgotPassword">
                  {{ otp.isForgotPassword ? 'Password Reset' : 'Verification' }}
                </span>
              </td>
              <td>
                <span class="badge" [class.badge-success]="otp.isUsed" [class.badge-muted]="!otp.isUsed">
                  {{ otp.isUsed ? 'Used' : 'Unused' }}
                </span>
              </td>
              <td class="fs-13 text-muted">{{ otp.createdAt | date:'short' }}</td>
              <td class="fs-13 text-muted">{{ otp.expiresAt | date:'short' }}</td>
              <td>
                <span class="badge" [ngClass]="expiredBadge(otp)">
                  {{ isExpired(otp) ? 'Expired' : 'Valid' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class OtpLogsComponent implements OnInit {
  otps: any[] = [];
  loading = true;
  totalCount = 0;
  constructor(private mock: MockDataService) {}
  ngOnInit() {
    this.mock.getOtpCodes().subscribe(r => {
      this.otps = r.items;
      this.totalCount = r.totalCount;
      this.loading = false;
    });
  }
  isExpired(otp: any) { return new Date(otp.expiresAt) < new Date(); }
  expiredBadge(otp: any) {
    return { 'badge-danger': this.isExpired(otp) && !otp.isUsed, 'badge-success': otp.isUsed, 'badge-muted': !this.isExpired(otp) && !otp.isUsed };
  }
}
