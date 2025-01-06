import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExchangeRates {
  [key: string]: number;
}
export interface WalletCurrency {
  currency: string;
  balance: number;
}
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = 'http://localhost:8082/api/v1/wallets'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  getWallet(userId: number): Observable<any> {
    let response = this.http.get(`${this.apiUrl}/${userId}`);
    console.log(response)
    return response;

  }

  getFiatWallets(userId: number): Observable<WalletCurrency[]> {
    return this.http.get<WalletCurrency[]>(`${this.apiUrl}/fiat?userId=${userId}`);
  }

  geTransactions(userId: number): Observable<any> {
    let response = this.http.get(`${this.apiUrl}/transactions/${userId}`);
    console.log(response)
    return response;

  }
  createWallet(userId: number, defaultCurrency: string): Observable<any> {
    return this.http.post(this.apiUrl, { userId, defaultCurrency });
  }

  getBalance(userId: number, currency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/balance/${currency}`);
  }

  creditWallet(userId: number, currency: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/credit`, { currency, amount });
  }

  debitWallet(userId: number, currency: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/debit`, { currency, amount });
  }

  getExchangeRates(currency: string): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(`${this.apiUrl}/exchangeRates/${currency}`);
  }
}
