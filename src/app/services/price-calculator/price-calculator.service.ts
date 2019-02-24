import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  private readonly usdConversionRate = 0.76;
  private readonly eurosConversionRate = 0.67;

  constructor() { }

  getNzdPrice(price: number): string {
    return price.toFixed(2);
  }

  getUsdPrice(price: number): string {
    return (price * this.usdConversionRate).toFixed(2);
  }

  getEurosPrice(price: number): string {
    return (price * this.eurosConversionRate).toFixed(2);
  }
}
