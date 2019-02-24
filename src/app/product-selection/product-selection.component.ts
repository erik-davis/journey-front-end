import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductType } from '../models/productType';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {

  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent;

  tabLabels: Array<string>;

  constructor() {
   this.tabLabels = Object.values(ProductType);
  }

  ngOnInit() {
    this.productDetail.productSelected(ProductType.Lawnmower);
  }

  showProduct($event: MatTabChangeEvent): void {
    const selectedIndex = $event.index;
    const selectedLabel = this.tabLabels[selectedIndex];
    const isValidSelection = selectedLabel != null;
    if (isValidSelection) {
      this.productDetail.productSelected(selectedLabel as ProductType);
    } else {
      throw new Error('there is no corresponding ProductType for the tab selected at index: ' + selectedIndex);
    }
  }

}
