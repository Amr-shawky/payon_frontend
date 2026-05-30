import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { VirtualCardDto } from '../models/blockchain-models';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class VirtualCardsService {
  private readonly apiBase = `${environment.apiBaseUrl}/VirtualCards`;

  constructor(private http: HttpClient, private mock: MockDataService) {}

  issue(accountId: string, name: string, limit = 1000): Observable<VirtualCardDto> {
    if (environment.useMockData) return this.mock.issueCard(accountId, name, limit);
    return this.http.post<{ data: VirtualCardDto }>(`${this.apiBase}/Issue?accountId=${accountId}&name=${name}&limit=${limit}`, {}).pipe(map(r => r.data));
  }

  get(cardId: string) {
    if (environment.useMockData) return this.mock.getCard(cardId);
    return this.http.get<{ data: VirtualCardDto }>(`${this.apiBase}/${cardId}`).pipe(map(r => r.data));
  }

  lock(cardId: string) {
    if (environment.useMockData) return this.mock.lockCard(cardId);
    return this.http.post<{ data: boolean }>(`${this.apiBase}/${cardId}/lock`, {}).pipe(map(r => r.data));
  }

  unlock(cardId: string) {
    if (environment.useMockData) return this.mock.unlockCard(cardId);
    return this.http.post<{ data: boolean }>(`${this.apiBase}/${cardId}/unlock`, {}).pipe(map(r => r.data));
  }
}
