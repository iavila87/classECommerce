import mongoose from "mongoose";
import ticketsModel from "./models/tickets.model.js";

export default class TicketsDAOMongo {

    constructor(){
        this.model = mongoose.model( ticketsModel.ticketsCollection, ticketsModel.ticketsSchema );
    }

    save = async (ticket) => {
        let result = await this.model.create(ticket);
        return result;
    }
}