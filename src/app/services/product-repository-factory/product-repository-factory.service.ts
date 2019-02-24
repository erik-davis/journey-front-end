import { Injectable } from '@angular/core';

import { ProductType } from '../../models/productType';
import { RepositoryInterface } from '../../repository-interface';
import { Product } from 'src/app/models/product';

declare function LawnmowerRepository(): any;
declare function PhoneCaseRepository(): any;
declare function TShirtRepository(): any;

@Injectable({
  providedIn: 'root'
})
export class RepositoryFactoryService {

  constructor() { }

  getProductRepository(type: ProductType): RepositoryInterface {
    let repository: RepositoryInterface;
    switch (type) {
      case ProductType.Lawnmower:
        repository = LawnmowerRepository.prototype;
        break;
      case ProductType.PhoneCase:
        repository = PhoneCaseRepository.prototype;
        break;
      case ProductType.TShirt:
        repository = TShirtRepository.prototype;
        break;
      case ProductType.All:
        repository = this.getRepositoryOfAllProducts();
        break;
      default:
        throw new Error('no repository provided for product type ' + type);
    }
    return repository;
  }

  private getRepositoryOfAllProducts(): RepositoryInterface {
    let allProducts = new Array<Product>();
    const specificTypes = Object.values(ProductType).filter(type => type !== ProductType.All);
    specificTypes.forEach(type => {
      const repo = this.getProductRepository(type);
      allProducts = allProducts.concat(repo.getAll());
    });
    return {
      getAll(): Array<Product> { return allProducts; }
    };

  }
}
