import ProductsFactory from "../dao/products.PersistenceFactory.js";
import CartsFactory from "../dao/carts.PersistenceFactory.js";
import TicketsFactory from "../dao/tickets.PersistenceFactory.js";
import ProductsRepository from './products.repository.js'
import CartsRepository from './carts.repository.js'
import TicketsRepository from './tickets.repository.js'

export const ProductsService = new ProductsRepository(await ProductsFactory.getPersistence());

export const CartsService = new CartsRepository(await CartsFactory.getPersistence());

export const TicketsService = new TicketsRepository(await TicketsFactory.getPersistence());