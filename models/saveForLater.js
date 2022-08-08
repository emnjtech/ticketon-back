const mongoose = require('mongoose')

const saveEventSchema = mongoose.Schema({
    userId: { type: String, required: true },
   
    eventId: { type:String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    ticketId:{type: String, required: true },
    ticketLevel: { type: String, required: true },
    pricePerTicket: { type: Number, required: true },
    qty: { type: Number, required: true },
    venue: { type: String, required: true},
    country: { type: String, required: true },
    province: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    
})

module.exports = mongoose.model('savedEvents', saveEventSchema);