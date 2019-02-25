import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SortComparisonService {

  public compare(a: number | string, b: number | string, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public compareAsFloats(a: string, b: string, isAsc: boolean): number {
      return this.compare(parseFloat(a), parseFloat(b), isAsc);
  }
}
