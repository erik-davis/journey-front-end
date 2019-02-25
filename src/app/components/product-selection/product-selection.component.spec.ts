import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ProductSelectionComponent } from './product-selection.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductType } from '../models/productType';
import { RepositoryFactoryService } from '../services/product-repository-factory/product-repository-factory.service';

describe('ProductSelectionComponent', () => {
  let component: ProductSelectionComponent;
  let fixture: ComponentFixture<ProductSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSelectionComponent, ProductDetailComponent ],
      imports: [NoopAnimationsModule, MatSortModule,
        MatTabsModule, MatTableModule],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [ RepositoryFactoryService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate tab labels', () => {
    expect(component.tabLabels).toEqual(Object.values(ProductType));
  });

  it('should select first product type on init', () => {
    const selectedSpy = spyOn(component.productDetail, 'productSelected');

    component.ngOnInit();

    expect(selectedSpy).toHaveBeenCalledWith(component.tabLabels[0]);
  });

  it('should select product when show product is called', () => {
    const selectedSpy = spyOn(component.productDetail, 'productSelected');
    const testEvent = new MatTabChangeEvent();
    testEvent.index = component.tabLabels.length - 1;

    component.showProduct(testEvent);

    expect(selectedSpy).toHaveBeenCalledWith(component.tabLabels[testEvent.index]);
  });

  it('should throw error if label clicked has no corresponding product type', () => {
    const selectedSpy = spyOn(component.productDetail, 'productSelected');
    const testEvent = new MatTabChangeEvent();
    testEvent.index = component.tabLabels.length + 10;

    expect(() => {
      component.showProduct(testEvent);
    }).toThrowError();

    expect(selectedSpy).not.toHaveBeenCalled();
  });
});
