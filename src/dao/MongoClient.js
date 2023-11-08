import mongoose from "mongoose";
import config from '../config/config.js'

export default class MongoClient {

    constructor() {
        this.connected = true;
        this.client = mongoose;
    }

    connect = async () => {
        try {
            await this.client.connect(config.mongo.uri, { dbName: config.mongo.dbname });
        }
        catch(error) {
            throw new Error('Cannot connect to the database');
        }
    }
}