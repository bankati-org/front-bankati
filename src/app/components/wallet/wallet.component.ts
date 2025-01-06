import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe, DecimalPipe, NgClass, NgForOf, NgIf, SlicePipe} from '@angular/common';
import {ExchangeChartComponent} from "../exchange-chart-component/exchange-chart-component.component";
import {WalletService} from "../../service/wallet-api.service";
import {isToday, parseISO, subDays, subMonths} from "date-fns"; // Importer CommonModule


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ExchangeChartComponent,
    DecimalPipe,
    DatePipe,
    NgClass,
    SlicePipe
  ],
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  balances: any[] = [];
  transactions : any [] =[];
  userId = 1; // ID utilisateur exemple
  visibleTransactions = 5; // Nombre de transactions visibles par défaut
  showAllTransactions = false;
  todayTransactions : any[] = [];
  last7DaysTransactions: any[] = [];
  lastMonthTransactions : any[] = [];
  olderTransactions :any[] = [];


  toggleTransactions(): void {
    this.showAllTransactions = !this.showAllTransactions;
    this.visibleTransactions = this.showAllTransactions ? this.transactions.length : 5;
  }

  constructor(private walletService: WalletService) {}

  ngOnInit(): void {
    this.fetchBalances();
    this.fetchTransactions();

  }

  getFlagCode(currency: string): string {
    const flagMap: { [key: string]: string } = {
      AED: 'ae', // Dirham des Émirats Arabes Unis
      AFN: 'af', // Afghani afghan
      ALL: 'al', // Lek albanais
      AMD: 'am', // Dram arménien
      ANG: 'cw', // Florin antillais
      AOA: 'ao', // Kwanza angolais
      ARS: 'ar', // Peso argentin
      AUD: 'au', // Dollar australien
      AWG: 'aw', // Florin arubais
      AZN: 'az', // Manat azerbaïdjanais
      BAM: 'ba', // Mark convertible de Bosnie-Herzégovine
      BBD: 'bb', // Dollar barbadien
      BDT: 'bd', // Taka bangladais
      BGN: 'bg', // Lev bulgare
      BHD: 'bh', // Dinar bahreïni
      BIF: 'bi', // Franc burundais
      BMD: 'bm', // Dollar bermudien
      BND: 'bn', // Dollar brunéien
      BOB: 'bo', // Boliviano bolivien
      BRL: 'br', // Real brésilien
      BSD: 'bs', // Dollar bahaméen
      BTN: 'bt', // Ngultrum bhoutanais
      BWP: 'bw', // Pula botswanais
      BYN: 'by', // Rouble biélorusse
      BZD: 'bz', // Dollar bélizien
      CAD: 'ca', // Dollar canadien
      CDF: 'cd', // Franc congolais
      CHF: 'ch', // Franc suisse
      CLP: 'cl', // Peso chilien
      CNY: 'cn', // Yuan chinois
      COP: 'co', // Peso colombien
      CRC: 'cr', // Colón costaricain
      CUP: 'cu', // Peso cubain
      CVE: 'cv', // Escudo cap-verdien
      CZK: 'cz', // Couronne tchèque
      DJF: 'dj', // Franc djiboutien
      DKK: 'dk', // Couronne danoise
      DOP: 'do', // Peso dominicain
      DZD: 'dz', // Dinar algérien
      EGP: 'eg', // Livre égyptienne
      ERN: 'er', // Nakfa érythréen
      ETB: 'et', // Birr éthiopien
      EUR: 'eu', // Euro
      FJD: 'fj', // Dollar fidjien
      FKP: 'fk', // Livre des îles Falkland
      GBP: 'gb', // Livre sterling
      GEL: 'ge', // Lari géorgien
      GHS: 'gh', // Cedi ghanéen
      GIP: 'gi', // Livre de Gibraltar
      GMD: 'gm', // Dalasi gambien
      GNF: 'gn', // Franc guinéen
      GTQ: 'gt', // Quetzal guatémaltèque
      GYD: 'gy', // Dollar guyanien
      HKD: 'hk', // Dollar de Hong Kong
      HNL: 'hn', // Lempira hondurien
      HRK: 'hr', // Kuna croate
      HTG: 'ht', // Gourde haïtienne
      HUF: 'hu', // Forint hongrois
      IDR: 'id', // Roupie indonésienne
      ILS: 'il', // Nouveau shekel israélien
      INR: 'in', // Roupie indienne
      IQD: 'iq', // Dinar irakien
      IRR: 'ir', // Rial iranien
      ISK: 'is', // Couronne islandaise
      JMD: 'jm', // Dollar jamaïcain
      JOD: 'jo', // Dinar jordanien
      JPY: 'jp', // Yen japonais
      KES: 'ke', // Shilling kényan
      KGS: 'kg', // Som kirghize
      KHR: 'kh', // Riel cambodgien
      KMF: 'km', // Franc comorien
      KPW: 'kp', // Won nord-coréen
      KRW: 'kr', // Won sud-coréen
      KWD: 'kw', // Dinar koweïtien
      KYD: 'ky', // Dollar des îles Caïmans
      KZT: 'kz', // Tenge kazakh
      LAK: 'la', // Kip laotien
      LBP: 'lb', // Livre libanaise
      LKR: 'lk', // Roupie srilankaise
      LRD: 'lr', // Dollar libérien
      LSL: 'ls', // Loti lesothan
      LYD: 'ly', // Dinar libyen
      MAD: 'ma', // Dirham marocain
      MDL: 'md', // Leu moldave
      MGA: 'mg', // Ariary malgache
      MKD: 'mk', // Denar macédonien
      MMK: 'mm', // Kyat birman
      MNT: 'mn', // Tugrik mongol
      MOP: 'mo', // Pataca macanais
      MRU: 'mr', // Ouguiya mauritanien
      MUR: 'mu', // Roupie mauricienne
      MVR: 'mv', // Rufiyaa maldivien
      MWK: 'mw', // Kwacha malawite
      MXN: 'mx', // Peso mexicain
      MYR: 'my', // Ringgit malaisien
      MZN: 'mz', // Metical mozambicain
      NAD: 'na', // Dollar namibien
      NGN: 'ng', // Naira nigérian
      NIO: 'ni', // Córdoba nicaraguayen
      NOK: 'no', // Couronne norvégienne
      NPR: 'np', // Roupie népalaise
      NZD: 'nz', // Dollar néo-zélandais
      OMR: 'om', // Rial omanais
      PAB: 'pa', // Balboa panaméen
      PEN: 'pe', // Sol péruvien
      PGK: 'pg', // Kina papou-néo-guinéen
      PHP: 'ph', // Peso philippin
      PKR: 'pk', // Roupie pakistanaise
      PLN: 'pl', // Złoty polonais
      PYG: 'py', // Guarani paraguayen
      QAR: 'qa', // Riyal qatari
      RON: 'ro', // Leu roumain
      RSD: 'rs', // Dinar serbe
      RUB: 'ru', // Rouble russe
      RWF: 'rw', // Franc rwandais
      SAR: 'sa', // Riyal saoudien
      SBD: 'sb', // Dollar des îles Salomon
      SCR: 'sc', // Roupie seychelloise
      SDG: 'sd', // Livre soudanaise
      SEK: 'se', // Couronne suédoise
      SGD: 'sg', // Dollar de Singapour
      SHP: 'sh', // Livre de Sainte-Hélène
      SLL: 'sl', // Leone sierra-léonais
      SOS: 'so', // Shilling somalien
      SRD: 'sr', // Dollar surinamais
      SSP: 'ss', // Livre sud-soudanaise
      STN: 'st', // Dobra santoméen
      SVC: 'sv', // Colón salvadorien
      SYP: 'sy', // Livre syrienne
      SZL: 'sz', // Lilangeni swazi
      THB: 'th', // Baht thaïlandais
      TJS: 'tj', // Somoni tadjik
      TMT: 'tm', // Manat turkmène
      TND: 'tn', // Dinar tunisien
      TOP: 'to', // Pa'anga tongan
      TRY: 'tr', // Livre turque
      TTD: 'tt', // Dollar trinidadien
      TWD: 'tw', // Nouveau dollar taïwanais
      TZS: 'tz', // Shilling tanzanien
      UAH: 'ua', // Hryvnia ukrainienne
      UGX: 'ug', // Shilling ougandais
      USD: 'us', // Dollar américain
      UYU: 'uy', // Peso uruguayen
      UZS: 'uz', // Sum ouzbek
      VES: 've', // Bolívar vénézuélien
      VND: 'vn', // Dong vietnamien
      VUV: 'vu', // Vatu vanuatais
      WST: 'ws', // Tala samoan
      XAF: 'cm', // Franc CFA (BEAC)
      XCD: 'ag', // Dollar des Caraïbes orientales
      XOF: 'bj', // Franc CFA (BCEAO)
      XPF: 'pf', // Franc CFP
      YER: 'ye', // Rial yéménite
      ZAR: 'za', // Rand sud-africain
      ZMW: 'zm', // Kwacha zambien
      ZWL: 'zw', // Dollar zimbabwéen
    };

    return flagMap[currency] || 'unknown'; // Retourne 'unknown' si la devise n'est pas trouvée
  }


  categorizeTransactions(): void {
    const today = new Date();
    const sevenDaysAgo = subDays(today, 7); // Subtraire 7 jours de la date actuelle avec date-fns
    const lastMonth = subMonths(today, 1); // Subtraire 1 mois de la date actuelle

    // Filtrage des transactions pour Today, Last 7 Days, Last Month, Older
    this.todayTransactions = this.transactions.filter(transaction => isToday(parseISO(transaction.timestamp)));

    this.last7DaysTransactions = this.transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.timestamp);
      return transactionDate >= sevenDaysAgo && transactionDate <= today;
    });

    this.lastMonthTransactions = this.transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.timestamp);
      return transactionDate >= lastMonth && transactionDate < today;
    });

    this.olderTransactions = this.transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.timestamp);
      return transactionDate < lastMonth;
    });
  }

  fetchTransactions(): void {
    this.walletService.geTransactions(this.userId).subscribe({
      next: (response) => {
        console.log('Portefeuille reçu :', response); // Vérifiez la structure de l'objet Wallet
        this.transactions = response ;
        this.categorizeTransactions();
        console.log('Balances extraites :', this.transactions); // Vérifiez le contenu des balances
      },
      error: (error) => {
        console.error('Erreur lors du chargement du portefeuille :', error);
      }
    });
  }

  fetchBalances(): void {
    this.walletService.getWallet(this.userId).subscribe({
      next: (wallet) => {
        console.log('Portefeuille reçu :', wallet); // Vérifiez la structure de l'objet Wallet
        this.balances = wallet.currencies; // Extraire les données des devises (ou ajuster selon la clé réelle)
        console.log('Balances extraites :', this.balances); // Vérifiez le contenu des balances
      },
      error: (error) => {
        console.error('Erreur lors du chargement du portefeuille :', error);
      }
    });
  }



  menuItems = [
    { icon: 'wallet', label: 'Wallet' },
    { icon: 'crypto', label: 'Crypto Wallet' },
    { icon: 'user', label: 'Something' },
  ];

  // balances = [
  //   { currency: 'Morrocan Dirham', amount: '1568 Dhs', transactions: '34' },
  //   { currency: 'Euro', amount: '€542.02', transactions: '34' },
  //   { currency: 'American Dollar', amount: '$654', transactions: '34' }
  // ];

  periods = ['Today', 'last week', 'last month', 'last year'];


  // transactions = [
  //   {
  //     type: 'Online payment',
  //     date: '03 January, 12:56PM',
  //     amount: '+500Dhs',
  //     iconBg: 'bg-red-500',
  //     amountColor: 'text-green-500'
  //   },
  //   // Add more transactions as needed
  // ];

}
