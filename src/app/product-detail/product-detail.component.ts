import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { ProductType } from '../models/productType';
import { RepositoryFactoryService } from '../services/product-repository-factory/product-repository-factory.service';
import { Product } from '../models/product';
import { PriceCalculatorService } from '../services/price-calculator/price-calculator.service';
import { ProductHeader } from '../models/ProductHeader';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct: ProductType;
  products = new Array<Product>();
  sortedProducts: Array<Product>;
  productHeaders = new Array<ProductHeader>(
    new ProductHeader('name', 'Name'),
    new ProductHeader('priceNzd', 'Price (NZD)'),
    new ProductHeader('priceUsd', 'Price (USD)'),
    new ProductHeader('priceEuros', 'Price (Euros)')
  );

  constructor(private respositoryFactory: RepositoryFactoryService,
              private priceCalculatorService: PriceCalculatorService) { 
  }

  ngOnInit() {
  }

  productSelected(product: ProductType): void {
    const repo = this.respositoryFactory.getProductRepository(product);
    const unpricedProducts = repo.getAll();
    this.products = this.assignPrices(unpricedProducts);
    this.sortedProducts = this.products.slice(0);
  }

  sortData(sort: Sort): void {
    const dataCopy = this.products.slice(0);

    if (!sort.active || sort.direction === '') {
      this.sortedProducts = dataCopy;
      return;
    }

    this.sortedProducts = dataCopy.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case this.productHeaders[0].name: return this.compare(a.name, b.name, isAsc);
        case this.productHeaders[1].name: return this.compareAsFloats(a.priceNzd, b.priceNzd, isAsc);
        case this.productHeaders[2].name: return this.compareAsFloats(a.priceUsd, b.priceUsd, isAsc);
        case this.productHeaders[3].name: return this.compareAsFloats(a.priceEuros, b.priceEuros, isAsc);
        default: return 0;
      }
    });
  }

  private assignPrices(products: Array<Product>): Array<Product> {
    products.map(p => {
      p.priceNzd = this.priceCalculatorService.getNzdPrice(p.price);
      p.priceUsd = this.priceCalculatorService.getUsdPrice(p.price);
      p.priceEuros = this.priceCalculatorService.getEurosPrice(p.price);
    });
    return products;
  }

  private compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareAsFloats(a: string, b: string, isAsc: boolean): number {
    return this.compare(parseFloat(a), parseFloat(b), isAsc);
  }

}
