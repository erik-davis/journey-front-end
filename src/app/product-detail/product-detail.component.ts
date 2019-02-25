import { Component, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { ProductType } from '../models/productType';
import { RepositoryFactoryService } from '../services/product-repository-factory/product-repository-factory.service';
import { Product } from '../models/product';
import { PriceCalculatorService } from '../services/price-calculator/price-calculator.service';
import { ProductView } from '../models/product-view';
import { SortComparisonService } from '../services/sort-comparison/sort-comparison.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  @Input() selectedProduct: ProductType;
  displayedProducts: Array<ProductView>;
  displayedColumns = ['name', 'priceNzd', 'priceUsd', 'priceEuros'];

  private unsortedProducts: Array<ProductView>;

  constructor(private respositoryFactory: RepositoryFactoryService,
              private priceCalculatorService: PriceCalculatorService,
              private sortComparisonService: SortComparisonService) { 
  }

  productSelected(product: ProductType): void {
    const repo = this.respositoryFactory.getProductRepository(product);
    const allProducts = repo.getAll();
    this.unsortedProducts = this.createProductViews(allProducts);
    this.displayedProducts = this.unsortedProducts.slice(0);
  }

  sortChanged(sort: Sort): void {
    const unsortedProductsCopy = this.unsortedProducts.slice(0);
    const sortRemoved = !sort.active || sort.direction === '';

    if (sortRemoved) {
      this.displayedProducts = unsortedProductsCopy;
    } else {
      this.sortProducts(unsortedProductsCopy, sort);
    }
  }

  private createProductViews(products: Array<Product>): Array<ProductView> {
    const productViews = new Array<ProductView>();
    products.map(p => {
      const productView = new ProductView();
      productView.name = p.name;
      productView.priceNzd = this.priceCalculatorService.getNzdPrice(p.price);
      productView.priceUsd = this.priceCalculatorService.getUsdPrice(p.price);
      productView.priceEuros = this.priceCalculatorService.getEurosPrice(p.price);
      productViews.push(productView);
    });
    return productViews;
  }

  private sortProducts(unsortedCopy: Array<ProductView>, sort: Sort): void {
    this.displayedProducts = unsortedCopy.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case this.displayedColumns[0]: return this.sortComparisonService.compare(a.name, b.name, isAsc);
        case this.displayedColumns[1]: return this.sortComparisonService.compareAsFloats(a.priceNzd, b.priceNzd, isAsc);
        case this.displayedColumns[2]: return this.sortComparisonService.compareAsFloats(a.priceUsd, b.priceUsd, isAsc);
        case this.displayedColumns[3]: return this.sortComparisonService.compareAsFloats(a.priceEuros, b.priceEuros, isAsc);
        default: throw new Error('column selected has no sorting algorithm. column name: ' + sort.active);
      }
    });
  }
}
