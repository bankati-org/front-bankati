import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-creance',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './creance.component.html',
  styleUrl: './creance.component.css'
})
export class CreanceComponent {
  activeTab: string = 'creditors'; // Déclarer la propriété activeTab
  creditors = [
    {
      logo: 'assets/images/maroc-telecom.png',
      name: 'IAM Recharges',
      products: ['Téléphonie et Internet SIM']
    },
    {
      logo: 'assets/images/maroc-telecom.png',
      name: 'IAM Factures',
      products: ['Produit Internet SIM', 'Produit Fixe SIM', 'Produit Mobile SIM']
    },
    {
      logo: 'assets/images/redal.jpeg',
      name: 'Redal',
      products: ['Factures Redal']
    },
    {
      logo: 'assets/images/amendis.png',
      name: 'Amendis Tanger',
      products: ['Factures Amendis Tanger']
    },
    {
      logo: 'assets/images/amendis.png',
      name: 'Amendis Tétouan',
      products: ['Factures Amendis Tétouan']
    },
    {
      logo: 'assets/images/lydec.jpeg',
      name: 'Lydec',
      products: ['Factures Lydec']
    }
  ];

  paymentHistory: string[] = [
    "Paiement du créancier ONCF - 2023-01-15",
    "Paiement de la facture de téléphone - 2023-02-20",
    "Paiement de la facture d'eau - 2023-03-10"
    // Ajoutez d'autres éléments d'historique des paiements ici
  ];


  allCategories: string[] = ['ONCF', 'Téléphone', 'Eau', 'Électricité']; // Liste de toutes les catégories
  selectedCategory: string = 'Toutes les catégories'; // Catégorie sélectionnée par défaut


  constructor() { }

  ngOnInit(): void {
  }

  get filteredCreditors() {
    if (this.selectedCategory === 'Toutes les catégories') {
      return this.creditors;
    } else {
      return this.creditors.filter(creditor =>
        creditor.products.includes(this.selectedCategory)
      );
    }
  }
  getCreditorPairs(creditors: any[]) {
    const pairs = [];
    for (let i = 0; i < creditors.length; i += 2) {
      pairs.push(creditors.slice(i, i + 2));
    }
    return pairs;
  }
}
