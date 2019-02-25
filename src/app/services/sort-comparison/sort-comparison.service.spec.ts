import { SortComparisonService } from './sort-comparison.service';
import { TestBed } from '@angular/core/testing';

describe('SortComparisonService', () => {
    let service: SortComparisonService;

    beforeEach(() => TestBed.configureTestingModule({}));
    beforeEach(() => {
      service = TestBed.get(SortComparisonService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should compare as floats', () => {
        const returnedValue = 1;
        const compareSpy = spyOn(service, 'compare').and.returnValue(returnedValue);
        const isAsc = true;

        const result = service.compareAsFloats('20.00', '15.50', isAsc);

        expect(result).toEqual(returnedValue);
        expect(compareSpy).toHaveBeenCalledWith(20, 15.5, isAsc);
    });

    it('should compare as strings asc', () => {
        const isAsc = true;

        const result = service.compare('foo', 'dog', isAsc);

        expect(result).toEqual(1);       
    });

    it('should compare as strings desc', () => {
        const isAsc = false;

        const result = service.compare('foo', 'dog', isAsc);

        expect(result).toEqual(-1);       
    });

    it('should compare as numbers asc', () => {
        const isAsc = true;

        const result = service.compare(5, 10, isAsc);

        expect(result).toEqual(-1);       
    });

    it('should compare as numbers desc', () => {
        const isAsc = false;

        const result = service.compare(5, 10, isAsc);

        expect(result).toEqual(1);       
    });
});
