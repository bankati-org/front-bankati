// transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

export interface TransferRequest {
  fromUserId: string;
  toUserId: string;
  currency: string;
  amount: number;
}

export interface TransferMultiCurrencyRequest {
  fromUserId: string;
  toUserId: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = `${environment.apiUrl}api/v1/wallets`;

  constructor(private http: HttpClient) {}

  transfer(request: TransferRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transfer`, request);
  }

  transferMultiCurrency(request: TransferMultiCurrencyRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transfer/multi-currency`, request);
  }
}
