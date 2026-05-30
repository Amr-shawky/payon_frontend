import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  MOCK_DASHBOARD_STATS, MOCK_USERS_SUMMARY, MOCK_USERS,
  MOCK_ACCOUNTS, MOCK_ACTIVITY_LOGS, MOCK_COMMISSION_GROUPS,
  MOCK_COMMISSIONS, MOCK_LIMIT_TYPES, MOCK_LIMIT_GROUPS,
  MOCK_LIMITS, MOCK_CURRENCIES, MOCK_COUNTRIES, MOCK_OTP_CODES,
  MOCK_INVITATION_USERS, MOCK_INVITATION_SETTINGS, MOCK_ACCOUNT_TYPES,
  MOCK_TRANSACTIONS, MOCK_TRANSACTION_SUMMARY, MOCK_PAYMENT_METHODS,
  MOCK_MONTHLY_STATS, MOCK_STATES_LAST_6_MONTHS
} from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  // ── Dashboard ──────────────────────────────────────────────────
  getDashboardStats() {
    return of(MOCK_DASHBOARD_STATS).pipe(delay(400));
  }
  getUsersSummary() {
    return of(MOCK_USERS_SUMMARY).pipe(delay(300));
  }

  // ── Users ──────────────────────────────────────────────────────
  getUsers(page = 1, size = 10, search?: string) {
    let items = [...MOCK_USERS];
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(u =>
        u.name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.phoneNumber.includes(s)
      );
    }
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── Accounts ───────────────────────────────────────────────────
  getAccounts(page = 1, size = 10, search?: string) {
    let items = [...MOCK_ACCOUNTS];
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(a =>
        a.ipa.toLowerCase().includes(s) ||
        a.userName.toLowerCase().includes(s) ||
        a.currencyCode.toLowerCase().includes(s)
      );
    }
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── Transactions ───────────────────────────────────────────────
  getTransactions(page = 1, size = 10, search?: string) {
    let items = [...MOCK_TRANSACTIONS];
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(t =>
        t.senderIpa.toLowerCase().includes(s) ||
        t.receiverIpa.toLowerCase().includes(s) ||
        t.transactionType.toLowerCase().includes(s) ||
        t.status.toLowerCase().includes(s)
      );
    }
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }
  getTransactionSummary() {
    return of(MOCK_TRANSACTION_SUMMARY).pipe(delay(300));
  }
  getPaymentMethods() {
    return of(MOCK_PAYMENT_METHODS).pipe(delay(300));
  }
  getMonthlyStats() {
    return of(MOCK_MONTHLY_STATS).pipe(delay(300));
  }
  getStatesLastSixMonths() {
    return of(MOCK_STATES_LAST_6_MONTHS).pipe(delay(300));
  }

  // ── Audit Logs ─────────────────────────────────────────────────
  getActivityLogs(page = 1, size = 10, search?: string) {
    let items = [...MOCK_ACTIVITY_LOGS];
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(l =>
        l.fullName.toLowerCase().includes(s) ||
        l.actionDescription.toLowerCase().includes(s) ||
        l.route.toLowerCase().includes(s) ||
        l.ipAddress.includes(s)
      );
    }
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── Commissions ────────────────────────────────────────────────
  getCommissionGroups(page = 1, size = 10) {
    const items = MOCK_COMMISSION_GROUPS;
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }
  getCommissions() {
    return of(MOCK_COMMISSIONS).pipe(delay(300));
  }

  // ── Limits ─────────────────────────────────────────────────────
  getLimitTypes() { return of(MOCK_LIMIT_TYPES).pipe(delay(300)); }
  getLimitGroups() { return of(MOCK_LIMIT_GROUPS).pipe(delay(300)); }
  getLimits() { return of(MOCK_LIMITS).pipe(delay(300)); }

  // ── Currencies ─────────────────────────────────────────────────
  getCurrencies(page = 1, size = 10) {
    const items = MOCK_CURRENCIES;
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── Countries ──────────────────────────────────────────────────
  getCountries(page = 1, size = 10) {
    const items = MOCK_COUNTRIES;
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── OTP ────────────────────────────────────────────────────────
  getOtpCodes(page = 1, size = 10) {
    const items = MOCK_OTP_CODES;
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }

  // ── Invitations ────────────────────────────────────────────────
  getInvitationUsers(page = 1, size = 10) {
    const items = MOCK_INVITATION_USERS;
    return of({ items: items.slice((page - 1) * size, page * size), totalCount: items.length, page, size, totalPages: Math.ceil(items.length / size) }).pipe(delay(400));
  }
  getInvitationSettings() { return of(MOCK_INVITATION_SETTINGS).pipe(delay(300)); }

  // ── Account Types ──────────────────────────────────────────────
  getAccountTypes() { return of(MOCK_ACCOUNT_TYPES).pipe(delay(300)); }

  // ── Blockchain / Virtual Card (mock) ───────────────────────────
  createWallet(accountId: string) {
    const wallet = { walletId: 'w_' + Date.now(), address: 'mock_' + Math.random().toString(36).substr(2, 12), currency: 'XRP' };
    return of(wallet).pipe(delay(300));
  }

  getWalletBalance(walletId: string) {
    const balance = { walletId, balance: 1000.0, currency: 'XRP' };
    return of(balance).pipe(delay(300));
  }

  sendTransaction(fromWalletId: string, toAddress: string, amount: number, currency = 'XRP') {
    const tx = { transactionId: 'tx_' + Date.now(), from: fromWalletId, to: toAddress, amount, currency, status: 'confirmed' };
    return of(tx).pipe(delay(400));
  }

  issueCard(accountId: string, name: string, limit = 1000) {
    const card = { cardId: 'c_' + Date.now(), cardNumber: '4111' + Math.floor(100000000 + Math.random() * 900000000), expiry: '12/28', cvv: '' + Math.floor(100 + Math.random() * 900), limit, isLocked: false };
    return of(card).pipe(delay(400));
  }

  getCard(cardId: string) {
    const card = { cardId, cardNumber: '4111xxxxxxxxxxxx', expiry: '12/28', cvv: '123', limit: 1000, isLocked: false };
    return of(card).pipe(delay(300));
  }

  lockCard(cardId: string) {
    return of(true).pipe(delay(200));
  }

  unlockCard(cardId: string) {
    return of(true).pipe(delay(200));
  }
}
