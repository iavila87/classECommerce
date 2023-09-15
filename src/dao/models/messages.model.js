import mongoose from "mongoose";

const messagesCollection = 'messages'; // Nombre de la colleccion

const messagesSchema = new mongoose.Schema({
	user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;