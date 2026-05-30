import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ServiceTypeItem } from '../models/models';
import { MOCK_SERVICE_TYPES } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class ServiceTypesService {
  private readonly apiUrl = `${environment.apiBaseUrl}/Services/GetServiceTypesAsync`;

  constructor(private http: HttpClient) {}

  getServiceTypes(): Observable<ServiceTypeItem[]> {
    if (environment.useMockData) {
      return of(MOCK_SERVICE_TYPES);
    }

    return this.http.get<{ data: ServiceTypeItem[] }>(this.apiUrl).pipe(
      map(response => response?.data ?? [])
    );
  }
}
