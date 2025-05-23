import { Component } from '@angular/core';
import { GemstoneService } from './services/gemstone.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  gemstones = [
    { name: 'Jade', key: 'FLAWLESS_JADE_GEM', img: '/gemstones/flawless_jade_gem.png', color: '#00FF00' },
    { name: 'Ruby', key: 'FLAWLESS_RUBY_GEM', img: '/gemstones/flawless_ruby_gem.png', color: '#FF0000' },
    { name: 'Amber', key: 'FLAWLESS_AMBER_GEM', img: '/gemstones/flawless_amber_gem.png', color: '#FFBF00' },
    { name: 'Amethyst', key: 'FLAWLESS_AMETHYST_GEM', img: '/gemstones/flawless_amethyst_gem.png', color: '#800080' },
    { name: 'Topaz', key: 'FLAWLESS_TOPAZ_GEM', img: '/gemstones/flawless_topaz_gem.png', color: '#FFD700' },
    { name: 'Jasper', key: 'FLAWLESS_JASPER_GEM', img: '/gemstones/flawless_jasper_gem.png', color: '#FF69B4' },
    { name: 'Sapphire', key: 'FLAWLESS_SAPPHIRE_GEM', img: '/gemstones/flawless_sapphire_gem.png', color: '#0000FF' }
  ];

  focusedGemKey: string | null = null;

  gemstonePrices: { [key: string]: number } = {};
  gemstoneQuantities: { [key: string]: number } = {};

  constructor(private gemstoneService: GemstoneService) {}

  ngOnInit() {
    this.loadPrices();
    this.loadQuantitiesFromLocalStorage();

    // Atualiza preços a cada 60 segundos
    setInterval(() => this.loadPrices(), 60000);
  }

  loadPrices() {
    this.gemstoneService.getBazaarData().subscribe(data => {
      this.gemstones.forEach(gem => {
        const product = data.products[gem.key];
        this.gemstonePrices[gem.key] = product ? product.quick_status.sellPrice : 0;
      });
    });
  }

  updateQuantity(gemKey: string, quantity: number) {
    this.gemstoneQuantities[gemKey] = quantity;
    this.saveQuantitiesToLocalStorage();
  }

  saveQuantitiesToLocalStorage() {
    localStorage.setItem('gemstoneQuantities', JSON.stringify(this.gemstoneQuantities));
  }

  loadQuantitiesFromLocalStorage() {
    const saved = localStorage.getItem('gemstoneQuantities');
    if (saved) {
      this.gemstoneQuantities = JSON.parse(saved);
    }
  }

  getTotal(gemKey: string): number {
    const qty = this.gemstoneQuantities[gemKey] || 0;
    const price = this.gemstonePrices[gemKey] || 0;
    return qty * price;
  }

  getTotalAll(): number {
    return this.gemstones.reduce((sum, gem) => sum + this.getTotal(gem.key), 0);
  }

  onFocus(gemKey: string) {
    this.focusedGemKey = gemKey;
  }

  onBlur() {
    this.focusedGemKey = null;
  }
}
