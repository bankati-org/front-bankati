import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CryptoWalletService {
  private apiUrl = `${environment.walletApiUrl}api/crypto`;


  constructor(private http: HttpClient) {}

  getCryptoWallets(userId: number): Observable<any> {
    return this.http.get(`http://localhost:8082/api/v1/wallets/crypto?userId=${userId}`);
  }

  buyCrypto(userId: number, cryptoSymbol: string, fiatAmount: number, fiatCurrency: string): Observable<any> {
    const body = { userId, cryptoSymbol, fiatAmount, fiatCurrency };
    return this.http.post(`${this.apiUrl}/buy`, body);
  }


  sellCrypto(userId: number, cryptoSymbol: string, cryptoAmount: number, fiatCurrency: string): Observable<any> {
    const body = { userId, cryptoSymbol, cryptoAmount, fiatCurrency };
    return this.http.post(`${this.apiUrl}/sell`, body);
  }


  transferCrypto(fromUserId: number, toUserId: number, cryptoSymbol: string, cryptoAmount: number): Observable<any> {
    const body = { fromUserId, toUserId, cryptoSymbol, cryptoAmount };
    return this.http.post(`${this.apiUrl}/transfer`, body);
  }


  transferToFiat(userId: number, cryptoSymbol: string, cryptoAmount: number, fiatCurrency: string): Observable<any> {
    const body = { userId, cryptoSymbol, cryptoAmount, fiatCurrency };
    return this.http.post(`${this.apiUrl}/transfer-to-fiat`, body);
  }


  getCryptoTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/${userId}`);
  }


  getCryptoBalance(userId: number, currency: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance`, {
      params: { userId: userId.toString(), currency }
    });
  }


  getCryptoPrice(cryptoSymbol: string, fiatCurrency: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/price`, {
      params: { cryptoSymbol, fiatCurrency }
    });
  }


  getCryptoPrices(symbols: string[], fiatCurrency: string): Observable<any> {
    const params = { symbols: symbols.join(','), fiatCurrency };
    return this.http.get(`${this.apiUrl}/cryptoPrices`, { params });
  }
}
