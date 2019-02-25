import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ProductDetailComponent } from './product-detail.component';
import { RepositoryFactoryService } from '../services/product-repository-factory/product-repository-factory.service';
import { Product } from '../models/product';
import { ProductView } from '../models/product-view';
import { ProductType } from '../models/productType';
import { PriceCalculatorService } from '../services/price-calculator/price-calculator.service';
import { SortComparisonService } from '../services/sort-comparison/sort-comparison.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let boxedComponent: any;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    boxedComponent = component as any;
    fixture.detectChanges();
  });

  const getFakeProducts = () => {
    const fakeProduct1 = new Product();
    const fakeProduct2 = new Product();
    return [ fakeProduct1, fakeProduct2 ];
  };

  const getFakeProductViews = () => {
    const fakeProductView1 = new ProductView();
    const fakeProductView2 = new ProductView();
    return [ fakeProductView1, fakeProductView2 ];
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set unsorted and diplayed products when product is selected',
    inject([ RepositoryFactoryService], (repoFactory: RepositoryFactoryService) => {
      const allProducts = getFakeProducts();
      const fakeRepo = { getAll: () => allProducts};
      const productViews = getFakeProductViews();
      const getRepoSpy = spyOn(repoFactory, 'getProductRepository').and.returnValue(fakeRepo);
      const createProductViewsSpy = spyOn(boxedComponent, 'createProductViews').and.returnValue(productViews);
      const testType = ProductType.Lawnmower;

      component.productSelected(testType);

      expect(getRepoSpy).toHaveBeenCalledWith(testType);
      expect(createProductViewsSpy).toHaveBeenCalledWith(allProducts);
      expect(component.displayedProducts).toEqual(productViews.slice(0));
      expect(boxedComponent.unsortedProducts).toBe(productViews);
  }));

  it('should reset displayed products if sort is inactive', () => {
    const productViews = getFakeProductViews();
    boxedComponent.unsortedProducts = productViews;
    const inActiveSort = { active: '', direction: 'asc' } as Sort;
    const sortSpy = spyOn(boxedComponent, 'sortProducts');

    component.sortChanged(inActiveSort);
    expect(sortSpy).not.toHaveBeenCalled();
    expect(component.displayedProducts[0]).toBe(boxedComponent.unsortedProducts[0]);
    expect(component.displayedProducts[1]).toBe(boxedComponent.unsortedProducts[1]);
  });

  it('should reset displayed products if sort direction is empty', () => {
    const productViews = getFakeProductViews();
    boxedComponent.unsortedProducts = productViews;
    const inActiveSort = { active: 'name', direction: '' } as Sort;
    const sortSpy = spyOn(boxedComponent, 'sortProducts');

    component.sortChanged(inActiveSort);
    expect(sortSpy).not.toHaveBeenCalled();
    expect(component.displayedProducts[0]).toBe(boxedComponent.unsortedProducts[0]);
    expect(component.displayedProducts[1]).toBe(boxedComponent.unsortedProducts[1]);
  });

  it('should call sortProducts if sort is active and has direction', () => {
    const productViews = getFakeProductViews();
    boxedComponent.unsortedProducts = productViews;
    const inActiveSort = { active: 'name', direction: 'asc' } as Sort;
    const sortSpy = spyOn(boxedComponent, 'sortProducts');

    component.sortChanged(inActiveSort);
    expect(sortSpy).toHaveBeenCalled();
    expect(component.displayedProducts).toBeUndefined();
  });

  it('should create product views with prices',
  inject([ PriceCalculatorService ], (priceCalculator: PriceCalculatorService) => {
    const allProducts = getFakeProducts();
    allProducts[0].name = 'journey';
    allProducts[1].name = 'digital';
    const nzdPrice = '10.00';
    const getNzdPriceSpy = spyOn(priceCalculator, 'getNzdPrice').and.returnValue(nzdPrice);
    const usdPrice = '8.00';
    const getUsdPriceSpy = spyOn(priceCalculator, 'getUsdPrice').and.returnValue(usdPrice);
    const eurosPrice = '9.00';
    const getEurosPriceSpy = spyOn(priceCalculator, 'getEurosPrice').and.returnValue(eurosPrice);

    const productViews = boxedComponent.createProductViews(allProducts);

    expect(getNzdPriceSpy).toHaveBeenCalledTimes(2);
    expect(getUsdPriceSpy).toHaveBeenCalledTimes(2);
    expect(getEurosPriceSpy).toHaveBeenCalledTimes(2);
    expect(productViews.length).toEqual(2);
    expect(productViews[0].priceNzd).toEqual(nzdPrice);
    expect(productViews[1].priceNzd).toEqual(nzdPrice);
    expect(productViews[0].priceUsd).toEqual(usdPrice);
    expect(productViews[1].priceUsd).toEqual(usdPrice);
    expect(productViews[0].priceEuros).toEqual(eurosPrice);
    expect(productViews[1].priceEuros).toEqual(eurosPrice);
    expect(productViews[0].name).toEqual(allProducts[0].name);
    expect(productViews[1].name).toEqual(allProducts[1].name);
  }));

  it('should do normal compare for sort on name column',
  inject([ SortComparisonService ], (sortComparisonService: SortComparisonService) => {
    const productViews = getFakeProductViews();
    productViews[0].name = 'sorting';
    productViews[1].name = 'test';
    const compareSpy = spyOn(sortComparisonService, 'compare');
    const nameSort = { active: component.displayedColumns[0], direction: 'asc'};

    boxedComponent.sortProducts(productViews, nameSort);
    
    expect(compareSpy).toHaveBeenCalledWith(productViews[1].name, productViews[0].name, true);
  }));

  it('should do float compare for sort on priceNzd column',
    inject([ SortComparisonService ], (sortComparisonService: SortComparisonService) => {
    const productViews = getFakeProductViews();
    productViews[0].priceNzd = 'sorting';
    productViews[1].priceNzd = 'test';
    const compareSpy = spyOn(sortComparisonService, 'compareAsFloats');
    const nameSort = { active: component.displayedColumns[1], direction: 'desc'};

    boxedComponent.sortProducts(productViews, nameSort);
    
    expect(compareSpy).toHaveBeenCalledWith(productViews[1].priceNzd, productViews[0].priceNzd, false);
  }));

  it('should do float compare for sort on priceUsd column',
    inject([ SortComparisonService ], (sortComparisonService: SortComparisonService) => {
    const productViews = getFakeProductViews();
    productViews[0].priceUsd = 'sorting';
    productViews[1].priceUsd = 'test';
    const compareSpy = spyOn(sortComparisonService, 'compareAsFloats');
    const nameSort = { active: component.displayedColumns[2], direction: 'desc'};

    boxedComponent.sortProducts(productViews, nameSort);
      
    expect(compareSpy).toHaveBeenCalledWith(productViews[1].priceUsd , productViews[0].priceUsd, false);
  }));

  it('should do float compare for sort on priceEuros column',
    inject([ SortComparisonService ], (sortComparisonService: SortComparisonService) => {
    const productViews = getFakeProductViews();
    productViews[0].priceEuros = 'sorting';
    productViews[1].priceEuros = 'test';
    const compareSpy = spyOn(sortComparisonService, 'compareAsFloats');
    const nameSort = { active: component.displayedColumns[3], direction: 'asc'};

    boxedComponent.sortProducts(productViews, nameSort);

    expect(compareSpy).toHaveBeenCalledWith(productViews[1].priceEuros , productViews[0].priceEuros, true);
  }));

  it('should throw error if column does not have sort comparison specified', () => {
    const fakeProductView1 = new ProductView();
    const fakeProductView2 = new ProductView();
    const productViews = [ fakeProductView1, fakeProductView2 ];
    const nameSort = { active: 'foo', direction: 'asc'};

    expect( () => {
      boxedComponent.sortProducts(productViews, nameSort);
    }).toThrowError();
  });
});
