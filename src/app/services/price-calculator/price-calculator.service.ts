import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {
  private readonly nzdConversionRate = 1;
  private readonly usdConversionRate = 0.76;
  private readonly eurosConversionRate = 0.67;

  constructor() { }

  getNzdPrice(price: number): string {
    return this.applyConversionRate(price, this.nzdConversionRate);
  }

  getUsdPrice(price: number): string {
    return this.applyConversionRate(price, this.usdConversionRate);
  }

  getEurosPrice(price: number): string {
    return this.applyConversionRate(price, this.eurosConversionRate);
  }

  private applyConversionRate(price: number, conversionRate: number): string {
    return (price * conversionRate).toFixed(2);
  }
}
