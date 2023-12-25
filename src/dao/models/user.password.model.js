import mongoose from "mongoose";

const userPasswordCollection = 'userPasswords'; // Nombre de la colleccion

const userPasswordSchema = new mongoose.Schema({
	
    email: { 
        type: String,
        ref: "users"
    },
    token: {
        type: String,
        required: true
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        expireAfterSeconds: 3600
    }
});

//const usersModel = mongoose.model(usersCollection, usersSchema);

//export default usersModel;

export default { userPasswordCollection, userPasswordSchema };