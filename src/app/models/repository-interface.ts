import { Product } from './product';

export interface RepositoryInterface {
    getAll: () => Array<Product>;
}