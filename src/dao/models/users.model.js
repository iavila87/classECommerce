import mongoose from "mongoose";

const usersCollection = 'users'; // Nombre de la colleccion

const usersSchema = new mongoose.Schema({
	first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        default: 'user'
    }
});

//const usersModel = mongoose.model(usersCollection, usersSchema);

//export default usersModel;

export default { usersCollection, usersSchema };