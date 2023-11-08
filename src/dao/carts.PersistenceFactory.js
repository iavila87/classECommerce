import config from "../config/config.js";

export default class PersistenceFactory {

    static getPersistence = async () => {
        switch (config.app.persistence) {
            case 'ARRAY':
                
                break;
            
            case 'FILE':
                
                break;
            
            case 'MONGO':
                let { default: CartsDAOMongo } = await import('./cartsDAOMongo.js');
                return new CartsDAOMongo;
                break;
            default:
                break;
        }
    }

}