import { TestBed } from '@angular/core/testing';

import { RepositoryFactoryService } from './product-repository-factory.service';
import { ProductType } from 'src/app/models/productType';
import { Product } from 'src/app/models/product';
import { RepositoryInterface } from 'src/app/models/repository-interface';

describe('RepositoryFactoryService', () => {
  let service: RepositoryFactoryService;
  let boxedService: any;

  beforeEach(() => TestBed.configureTestingModule({}));
  beforeEach(() => {
    service = TestBed.get(RepositoryFactoryService);
    boxedService = service as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get repo for lanwmower product type', () => {
    const fakeRepository = { prototype: { getAll: () => {}}};
    window['LawnmowerRepository'] = fakeRepository;

    const result = service.getProductRepository(ProductType.Lawnmower);

    expect(result.getAll).toBeDefined();
    expect(result.getAll).toBe(fakeRepository.prototype.getAll);
  });

  it('should get repo for phone case product type', () => {
    const fakeRepository = { prototype: { getAll: () => {}}};
    window['PhoneCaseRepository'] = fakeRepository;

    const result = service.getProductRepository(ProductType.PhoneCase);

    expect(result.getAll).toBeDefined();
    expect(result.getAll).toBe(fakeRepository.prototype.getAll);
  });

  it('should get repo for t-shirt product type', () => {
    const fakeRepository = { prototype: { getAll: () => {}}};
    window['TShirtRepository'] = fakeRepository;

    const result = service.getProductRepository(ProductType.TShirt);

    expect(result.getAll).toBeDefined();
    expect(result.getAll).toBe(fakeRepository.prototype.getAll);
  });

  it('should throw error if no repo for given type', () => {
    const fakeType = 'foo' as ProductType;

    expect(() => { service.getProductRepository(fakeType); }).toThrowError();
  });

  it('should call getRepositoryOfAllProducts for type all', () => {
    const fakeRepository = { getAll: (): Array<Product> => new Array<Product>() };
    const getRepoSpy = spyOn(boxedService, 'getRepositoryOfAllProducts').and.returnValue(fakeRepository);

    const repo = service.getProductRepository(ProductType.All);

    expect(repo).toBe(fakeRepository);
    expect(getRepoSpy).toHaveBeenCalled();
  });

  it('should return repo for all type that contains all products', () => {
    const fakeProduct1 = new Product();
    const fakeProduct2 = new Product();
    const fakeRepository = { getAll: () => [ fakeProduct1, fakeProduct2 ]};
    const getRepoSpy = spyOn(service, 'getProductRepository').and.returnValue(fakeRepository);

    const repo = boxedService.getRepositoryOfAllProducts() as RepositoryInterface;

    const specificTypes = Object.values(ProductType).filter(type => type !== ProductType.All);
    specificTypes.forEach(type => {
      expect(getRepoSpy).toHaveBeenCalledWith(type);
    });
    expect(repo.getAll().length).toEqual(2 * specificTypes.length);
    expect(repo.getAll().filter(p => p === fakeProduct1).length).toEqual(specificTypes.length);
    expect(repo.getAll().filter(p => p === fakeProduct2).length).toEqual(specificTypes.length);
  });
});
