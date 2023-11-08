import config from "../config/config.js";

export default class PersistenceFactory {

    static getPersistence = async () => {
        switch (config.app.persistence) {
            case 'ARRAY':
                
                break;
            
            case 'FILE':
                
                break;
            
            case 'MONGO':
                let { default: ProductsDAOMongo } = await import('./productsDAOMongo.js');
                return new ProductsDAOMongo;
                break;
            default:
                break;
        }
    }

}