import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { WalletDto, BalanceDto, TxDto } from '../models/blockchain-models';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class BlockchainService {
  private readonly apiBase = `${environment.apiBaseUrl}/Blockchain`;

  constructor(private http: HttpClient, private mock: MockDataService) {}

  createWallet(accountId: string): Observable<WalletDto> {
    if (environment.useMockData) {
      return this.mock.createWallet(accountId);
    }
    return this.http.post<{ data: WalletDto }>(`${this.apiBase}/CreateWallet?accountId=${accountId}`, {}).pipe(map(r => r.data));
  }

  getBalance(walletId: string): Observable<BalanceDto> {
    if (environment.useMockData) return this.mock.getWalletBalance(walletId);
    return this.http.get<{ data: BalanceDto }>(`${this.apiBase}/Balance/${walletId}`).pipe(map(r => r.data));
  }

  send(fromWalletId: string, toAddress: string, amount: number, currency = 'XRP') {
    if (environment.useMockData) return this.mock.sendTransaction(fromWalletId, toAddress, amount, currency);
    return this.http.post<{ data: TxDto }>(`${this.apiBase}/Send?fromWalletId=${fromWalletId}&toAddress=${toAddress}&amount=${amount}&currency=${currency}`, {}).pipe(map(r => r.data));
  }
}
