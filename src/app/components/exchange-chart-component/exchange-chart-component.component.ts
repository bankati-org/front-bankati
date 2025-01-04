import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { WalletService, ExchangeRates } from '../../service/wallet-api.service';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-exchange-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4">
      <div class="mb-4 flex items-center gap-4">
        <div>
          <label for="currency" class="mr-2">Sélectionner la devise source:</label>
          <select
            id="currency"
            [(ngModel)]="selectedCurrency"
            (change)="loadExchangeRates()"
            class="p-2 border rounded">
            <option *ngFor="let curr of availableCurrencies" [value]="curr">
              {{curr}}
            </option>
          </select>
        </div>
        <!--        <div>-->
        <!--          <label for="chartType" class="mr-2">Type de graphique:</label>-->
        <!--          <select-->
        <!--            id="chartType"-->
        <!--            [(ngModel)]="selectedChartType"-->
        <!--            (change)="loadExchangeRates()"-->
        <!--            class="p-2 border rounded">-->
        <!--            <option value="polarArea">Graphique Polaire</option>-->
        <!--            <option value="radar">Graphique Radar</option>-->
        <!--            <option value="pie">Graphique Circulaire</option>-->
        <!--            <option value="doughnut">Graphique Anneau</option>-->
        <!--          </select>-->
        <!--        </div>-->
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
        <div *ngFor="let rate of mainRates" class="p-4 border rounded shadow">
          <div class="text-lg font-bold text-red-600">{{rate.currency}}</div>
          <div class="text-2xl">{{rate.value | number:'1.4-4'}}</div>
        </div>
      </div>

      <div class="h-[400px]">
        <canvas id="exchangeChart"></canvas>
      </div>
    </div>  `
})
export class ExchangeChartComponent implements OnInit {
  private chart: Chart | undefined;
  selectedCurrency: string = 'MAD';
  selectedChartType: string = 'doughnut';
  availableCurrencies: string[] = ['MAD', 'EUR', 'USD', 'GBP'];
  mainRates: { currency: string; value: number }[] = [];
  private mainCurrencies = ['EUR', 'USD', 'GBP', 'AED'];

  constructor(private exchangeService: WalletService) {}

  ngOnInit() {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.exchangeService.getExchangeRates(this.selectedCurrency).subscribe(
      (rates: ExchangeRates) => {
        // Utiliser directement les taux sans normalisation
        this.mainRates = this.mainCurrencies.map(curr => ({
          currency: curr,
          value: rates[curr]
        }));
        this.updateChart(rates);
      }
    );
  }

  private updateChart(rates: ExchangeRates) {
    const canvas = document.getElementById('exchangeChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const chartData = this.mainCurrencies.map(curr => rates[curr]);

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.mainCurrencies,
        datasets: [{
          label: `Taux de change (1 ${this.selectedCurrency})`,
          data: chartData,
          backgroundColor: [
            '#007bff',
            '#20c997',
            '#0598d4',
            '#18a77b'
          ],
          borderWidth: 1,
          borderColor: '#ffffff',
          hoverBackgroundColor: 'gray',
          hoverBorderColor: '#ffffff',
          barThickness: 20,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutBounce',
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const rawValue = tooltipItem.raw;
                if (typeof rawValue === 'number') {
                  return `1 ${this.selectedCurrency} = ${rawValue.toFixed(4)} ${tooltipItem.label}`;
                }
                return `${tooltipItem.label}: valeur non disponible`;
              }
            }
          },
          legend: {
            display: true,
            position: 'top',
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Devises',
              color: '#007bff',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Taux de change',
              color: '#007bff',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            ticks: {
              callback: (value) => {
                if (typeof value === 'number') {
                  return value.toFixed(4);
                }
                return value;
              }
            },
            grid: {
              color: '#e5e5e5'
            }
          }
        }
      }
    });
  }
}
