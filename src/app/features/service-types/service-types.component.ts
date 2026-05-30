import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTypesService } from '../../core/services/service-types.service';
import { ServiceTypeItem } from '../../core/models/models';

@Component({
  selector: 'app-service-types',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <div class="page-title">
        <h1>Service Types</h1>
        <p>Platform capabilities available for onboarding and integrations.</p>
      </div>
      <div class="page-actions">
        <span class="badge badge-info">{{ serviceTypes.length }} types</span>
      </div>
    </div>

    <div class="card" style="padding:0">
      <div class="data-table-wrapper" *ngIf="!loading; else skel">
        <div *ngIf="error" class="p-3 text-danger">{{ error }}</div>
        <table class="data-table" *ngIf="!error">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let type of serviceTypes">
              <td class="fw-600">{{ type.name }}</td>
              <td class="text-muted">{{ type.description }}</td>
              <td>
                <span class="badge" [class.badge-success]="type.isActive" [class.badge-muted]="!type.isActive">
                  {{ type.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #skel>
        <div class="loading-overlay"><div class="spinner"></div></div>
      </ng-template>
    </div>
  `,
  styles: []
})
export class ServiceTypesComponent implements OnInit {
  serviceTypes: ServiceTypeItem[] = [];
  loading = true;
  error = '';

  constructor(private serviceTypesService: ServiceTypesService) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.loading = true;
    this.error = '';

    this.serviceTypesService.getServiceTypes().subscribe({
      next: types => {
        this.serviceTypes = types;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load service types right now.';
        this.loading = false;
      }
    });
  }
}
