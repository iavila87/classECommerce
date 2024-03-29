import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products'; // Nombre de la colleccion

const productsSchema = new mongoose.Schema({
	title: String,
	description: String,
	code: {
            type: String,
            unique: true,
            required: true
          },
	price: Number,
	status: Boolean,
	stock: Number,
	category: String,
	thumbnails: Array, // ver [string]
	owner: {
			type: String,
			required: true,
			default: 'admin',
			ref: "users"
		   }
});

productsSchema.plugin(mongoosePaginate);

//const productsModel = mongoose.model(productsCollection, productsSchema);

//export default productsModel;

export default { productsCollection, productsSchema };