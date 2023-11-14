import ProductsFactory from "../dao/products.PersistenceFactory.js";
import CartsFactory from "../dao/carts.PersistenceFactory.js";
import ProductsRepository from './products.repository.js'
import CartsRepository from './carts.repository.js'

export const ProductsService = new ProductsRepository(await ProductsFactory.getPersistence());

export const CartsService = new CartsRepository(await CartsFactory.getPersistence());