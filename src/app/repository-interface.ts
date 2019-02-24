import { Product } from './models/product';

export interface RepositoryInterface {
    getAll: () => Array<Product>;
}