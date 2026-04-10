import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'payon_admin_token';
  private readonly USER_KEY = 'payon_admin_user';

  private _currentUser$ = new BehaviorSubject<AdminUser | null>(this.loadUser());
  currentUser$ = this._currentUser$.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    // Mock login — accept any credentials
    const mockUser: AdminUser = {
      id: 'admin-001',
      name: 'Admin User',
      email: username,
      role: 'Admin',
      token: 'mock-jwt-token-' + Date.now()
    };
    this.saveUser(mockUser);
    this._currentUser$.next(mockUser);
    return of(true);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): AdminUser | null {
    return this._currentUser$.value;
  }

  private saveUser(user: AdminUser): void {
    localStorage.setItem(this.TOKEN_KEY, user.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private loadUser(): AdminUser | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
