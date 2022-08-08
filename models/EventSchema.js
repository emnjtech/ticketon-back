const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    eventId:{type:String, required:true},
    createdBy: { type: String, required:true },
    title: { type: String, required: true },
    Artiste: { type: String, required: false },
    image: { type: String, required: true },
    description: { type: String, required: false },
    alt: {type: String, required: true},
    ticketFrom: { type: Number, default: 0, required: false},
    venue: { type: String, required: true },
    category: { type: String, required: true },
    town: { type: String, required: true},
    province: { type: String, required: true },
    country:{ type: String, required: false },
    dateAndTime: { type: Date, required: true },
    dateCreated: { type: Date, required:true},
    totalTicketsRemaining: {type: Number,required: false}, 
    ticketLevels: {
        ticket1: { type: String, default: 'Free', required: false},
        ticket2: {type: String,required: false},
        ticket3: {type: String,required: false}, 
        ticket4: {type: String,required: false},
        ticket5: {type: String,required: false},

    },
    priceLevels: {
        price1: { type: Number, default:0, required:false}, 
        price2: {type: Number,required: false},
        price3: {type: Number,required: false},
        price4: {type: Number,required: false},
        price5: {type: Number,required: false},
    }
})

module.exports = mongoose.model('events', eventSchema);