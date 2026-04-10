import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-invitations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Invitation System</h1>
        <p>Configure referral bonuses and view users who used invitation codes</p>
      </div>
    </div>

    <!-- Settings Card -->
    <div class="card mb-24" *ngIf="settings">
      <h3 style="font-size:16px;margin-bottom:20px">Invitation Settings</h3>
      <div class="grid-3">
        <div class="form-group">
          <label>Bonus Amount (SAR)</label>
          <input class="form-control" type="number" [(ngModel)]="settings.bonusAmount"/>
        </div>
        <div class="form-group">
          <label>Duration After Signup (Hours)</label>
          <input class="form-control" type="number" [(ngModel)]="settings.durationInHours"/>
        </div>
        <div class="form-group">
          <label style="visibility:hidden">.</label>
          <button class="btn btn-primary">Save Settings</button>
        </div>
      </div>
      <div class="grid-2 mt-16">
        <div class="form-group">
          <label>English Description</label>
          <input class="form-control" [(ngModel)]="settings.description"/>
        </div>
        <div class="form-group">
          <label>Arabic Description</label>
          <input class="form-control" [(ngModel)]="settings.arDescription" dir="rtl"/>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card" style="padding:0">
      <div style="padding:20px 24px;border-bottom:1px solid var(--border)">
        <h3 style="font-size:15px">Users Who Used Invitation Codes</h3>
      </div>
      <div class="loading-overlay" *ngIf="loading"><div class="spinner"></div></div>
      <div class="data-table-wrapper" *ngIf="!loading">
        <table class="data-table">
          <thead>
            <tr><th>User</th><th>Referral Code Used</th><th>Referred By</th>
                <th>Bonus</th><th>Paid</th><th>Joined</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let inv of invitations">
              <td>
                <div class="fw-600">{{ inv.userName }}</div>
                <div class="fs-12 text-muted">{{ inv.userEmail }}</div>
              </td>
              <td><span class="badge badge-primary">{{ inv.referralCode }}</span></td>
              <td class="fw-600">{{ inv.referredByName }}</td>
              <td class="fw-700 text-success">{{ inv.bonusAmount | number:'1.2-2' }} SAR</td>
              <td>
                <span class="badge" [class.badge-success]="inv.isPaid" [class.badge-warning]="!inv.isPaid">
                  {{ inv.isPaid ? 'Paid' : 'Pending' }}
                </span>
              </td>
              <td class="fs-13 text-muted">{{ inv.createdAt | date:'mediumDate' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class InvitationsComponent implements OnInit {
  invitations: any[] = [];
  settings: any = null;
  loading = true;
  constructor(private mock: MockDataService) {}
  ngOnInit() {
    this.mock.getInvitationSettings().subscribe(s => this.settings = { ...s });
    this.mock.getInvitationUsers().subscribe(r => { this.invitations = r.items; this.loading = false; });
  }
}
