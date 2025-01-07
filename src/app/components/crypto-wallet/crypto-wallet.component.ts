import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {CryptoWalletService} from "../../service/crypto-wallet.service";
import {FormsModule} from "@angular/forms";
import {CommonModule, DecimalPipe} from "@angular/common";
import {ChartOptions, ChartType, ChartData} from "chart.js";
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-crypto-wallet',
  standalone: true,
  imports: [
    SidebarComponent,
    FormsModule,
    DecimalPipe,
    CommonModule,
    NgChartsModule
  ],
  templateUrl: './crypto-wallet.component.html',
  styleUrl: './crypto-wallet.component.css'
})
export class CryptoWalletComponent {
  userId: number = 1;
  balances: { symbol: string; balance: number; fiatValue: number }[] = [];
  transactions: any[] = [];
  marketData: { name: string; price: number; symbol: string }[] = [];
  selectedCrypto: string = 'BTC';
  selectedFiat: string = 'USD';
  exchangeRate: number | null = null;
  maxVisibleCards: number = 3;

  transfer = {
    fromCrypto: 'BTC',
    amount: 0,
    toUserId: 0
  };
  message: string | null = null;

  cryptoSymbols: string[] = ['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'XRP'];
  cryptoMarketData: { symbol: string; price: number }[] = [];
  fiatCurrency: string = 'USD';
  isLoading: boolean = true;

  doughnutChartLabels: string[] = []; // Crypto symbols (BTC, ETH, etc.)

  doughnutChartType: ChartType = 'doughnut';

  doughnutChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: $${context.raw}`;
          }
        }
      }
    }
  };
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'XRP'], // Example labels
    datasets: [
      {
        data: [48000, 3600, 1, 420, 0.67, 0.89], // Example data
        backgroundColor: [
          '#FF6384', // BTC
          '#36A2EB', // ETH
          '#FFCE56', // USDT
          '#4BC0C0', // BNB
          '#9966FF', // ADA
          '#FF9F40'  // XRP
        ]
      }
    ]
  };



  constructor(private cryptoWalletService: CryptoWalletService) {}

  ngOnInit(): void {
    this.fetchBalances();
    this.fetchTransactions();
    this.fetchCryptoMarketData();
    this.updateExchangeRate();
    this.fetchDoughnutChartData();
  }

  fetchBalances(): void {
    this.cryptoWalletService.getCryptoTransactions(this.userId).subscribe(wallet => {
      const allBalances = wallet.map((item: any) => ({
        symbol: item.currency,
        balance: item.amount,
        fiatValue: 0
      }));

      this.balances = allBalances.slice(0, this.maxVisibleCards);


      this.balances.forEach(balance => {
        this.cryptoWalletService.getCryptoPrice(balance.symbol, 'USD').subscribe(price => {
          balance.fiatValue = balance.balance * price;
        });
      });
    });
  }

  fetchTransactions(): void {
    this.cryptoWalletService.getCryptoTransactions(this.userId).subscribe(data => {
      this.transactions = data;
    });
  }

  fetchCryptoMarketData(): void {
    this.cryptoWalletService
      .getCryptoPrices(this.cryptoSymbols, this.fiatCurrency)
      .subscribe({
        next: (data: any[]) => {
          // Process data for the table
          this.cryptoMarketData = data.map((item) => ({
            symbol: item.symbol,
            price: item.price
          }));
          this.isLoading = false; // Disable loading indicator
        },
        error: (err) => {
          console.error('Failed to fetch crypto prices:', err);
          this.isLoading = false;
        }
      });
  }

  updateExchangeRate(): void {
    if (this.selectedCrypto && this.selectedFiat) {
      this.cryptoWalletService.getCryptoPrice(this.selectedCrypto, this.selectedFiat).subscribe(rate => {
        this.exchangeRate = rate;
      });
    }
  }
  submitTransfer(): void {
    if (this.transfer.amount <= 0 || this.transfer.toUserId <= 0) {
      this.message = 'Please enter valid transfer details.';
      return;
    }

    this.cryptoWalletService
      .transferCrypto(this.userId, this.transfer.toUserId, this.transfer.fromCrypto, this.transfer.amount)
      .subscribe({
        next: () => {
          this.message = 'Transfer successful!';
        },
        error: (err) => {
          console.error('Transfer failed:', err);
          this.message = 'Transfer failed. Please try again.';
        }
      });
  }

  getAvailableBalance(): number {
    const selectedBalance = this.balances.find(b => b.symbol === this.transfer.fromCrypto);
    return selectedBalance ? selectedBalance.balance : 0;
  }

  getCryptoFullName(symbol: string): string {
    const cryptoNames: { [key: string]: string } = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      USDT: 'Tether',
      BNB: 'Binance Coin',
      ADA: 'Cardano',
      XRP: 'Ripple'
    };

    return cryptoNames[symbol] || symbol;
  }

  fetchDoughnutChartData(): void {
    const cryptoSymbols = ['BTC', 'ETH', 'USDT', 'BNB', 'ADA', 'XRP'];
    const fiatCurrency = 'USD';

    this.cryptoWalletService.getCryptoPrices(cryptoSymbols, fiatCurrency).subscribe({
      next: (data: any[]) => {
        const prices = data.map(item => item.price);
        this.doughnutChartData = {
          labels: data.map(item => item.symbol),
          datasets: [
            {
              data: prices,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }
          ]
        };
        console.log('Doughnut chart data:', this.doughnutChartData);
      },
      error: (err) => {
        console.error('Failed to fetch crypto prices:', err);
      }
    });
  }


}
