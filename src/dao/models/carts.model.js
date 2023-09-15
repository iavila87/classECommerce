import mongoose from "mongoose";

const cartsCollection = 'carts'; // Nombre de la colleccion

const cartsSchema = new mongoose.Schema({
	products: {
        type: Array,
        required: true
    }
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;