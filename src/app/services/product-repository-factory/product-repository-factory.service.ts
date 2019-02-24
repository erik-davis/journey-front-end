import { Injectable } from '@angular/core';

import { ProductType } from '../../models/productType';
import { RepositoryInterface } from '../../repository-interface';

declare function LawnmowerRepository(): any;
declare function PhoneCaseRepository(): any;
declare function TShirtRepository(): any;

@Injectable({
  providedIn: 'root'
})
export class RepositoryFactoryService {

  constructor() { }

  getProductRepository(product: ProductType): RepositoryInterface {
    let repository: RepositoryInterface;
    switch (product) {
      case ProductType.Lawnmower:
        repository = LawnmowerRepository.prototype;
        break;
      case ProductType.PhoneCase:
        repository = PhoneCaseRepository.prototype;
        break;
      case ProductType.TShirt:
        repository = TShirtRepository.prototype;
        break;
    }
    return repository;
  }
}
