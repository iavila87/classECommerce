import mongoose from "mongoose";

const cartsCollection = 'carts'; // Nombre de la colleccion

const cartsSchema = new mongoose.Schema({
	products: {
        type:[{
            _id: false,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
});

//const cartsModel = mongoose.model(cartsCollection, cartsSchema);

//export default cartsModel;
export default { cartsCollection, cartsSchema };