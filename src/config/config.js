import dotenv from "dotenv"

dotenv.config();

export default {
    app: {
        persistence: process.env.PERSISTENCE
    },
    apiserver: {
        port: process.env.PORT
    },
    mongo: {
        uri: process.env.MONGO_URI,
        dbname: process.env.MONGO_DB_NAME
    }
}