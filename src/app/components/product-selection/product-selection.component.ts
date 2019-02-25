import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { ProductType } from '../../models/productType';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductSelectionComponent implements OnInit {

  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent;

  readonly tabLabels: Array<ProductType> = Object.values(ProductType);

  ngOnInit() {
    this.productDetail.productSelected(this.tabLabels[0]);
  }

  // the tabs are displayed in order from the ProductType enum, so the index is used to do a tab lookup here
  showProduct($event: MatTabChangeEvent): void {
    const selectedIndex = $event.index;
    const selectedLabel = this.tabLabels[selectedIndex];
    const isValidSelection = selectedLabel != null;
    if (isValidSelection) {
      this.productDetail.productSelected(selectedLabel);
    } else {
      throw new Error('there is no corresponding ProductType for the tab selected at index: ' + selectedIndex);
    }
  }
}
