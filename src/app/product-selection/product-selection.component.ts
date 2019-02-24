import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';

import { ProductType } from '../models/productType';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {

  constructor() { }
 // productSelected: number;
  get product() { return ProductType };
  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent;

  ngOnInit() {
    this.productDetail.productSelected(ProductType.Lawnmower);
  }

  showProduct($event: MatTabChangeEvent): void {
    const selectedIndex = $event.index;
    const isValidSelection = ProductType[selectedIndex] != null;
    if (isValidSelection) {
      this.productDetail.productSelected(selectedIndex);
    } else {
      throw new Error('there is no corresponding ProductType for the tab selected at index: ' + selectedIndex);
    }
  }

}
