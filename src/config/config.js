import dotenv from "dotenv"

dotenv.config();

export default {
    app: {
        environment: process.env.ENVIRONMENT,
        persistence: process.env.PERSISTENCE
    },
    apiserver: {
        port: process.env.PORT
    },
    mongo: {
        uri: process.env.MONGO_URI,
        dbname: process.env.MONGO_DB_NAME
    },
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
    stripe: {
        secret: process.env.STRIPE_SK
    }
}