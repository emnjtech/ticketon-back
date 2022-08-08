const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const bodyParser = require('body-parser')
const eventModel = require('./models/EventSchema')
const saveEvents = require('./models/saveForLater')
const ticketModel = require('./models/receipts')
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '10mb' }));
app.use(express.json())

app.use(cors())
app.get('/', (req,res) => {
    res.send("<h3 align='center'>Ticket server running on this port</h3>")
})

app.get("/allEvents", (req, res) => {
    eventModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})

app.get("/savedEvents", (req, res) => {
    saveEvents.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})
app.get("/tickets", (req, res) => {
    ticketModel.find({}, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})


app.get("/searchEvents", (req, res) => {
    querry = {title:req.body.title, country:req.body.country, province:req.body.province}
    eventModel.find(query, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result)
        }
    })
})


app.post('/createEvent', async (req, res) => {
    
 const newEvent = req.body
    //const newUser = new UserModel(user)
    const createEvent = new eventModel(newEvent)

    try {
        const savedPost = await createEvent.save()
        res.json(savedPost)
    }
    catch (err) {
        res.json({ message: err })
    }

})

app.delete('/deleteSavedTicket/:ticketId', async (req, res) => {
    
    const id = req.params.ticketId
    console.log(id)
    //const newUser = new UserModel(user)
    

    try {

     await  saveEvents.findOneAndRemove(id).exec()
        res.json(res.data)
    }
    catch (err) {
        res.json({ message: err })
    }

})

app.post('/saveEvents', async (req, res) => {
    console.log(req)
 const newEvent = req.body
    //const newUser = new UserModel(user)
    const createEvent = new saveEvents(newEvent)

    try {
        const savedPost = await createEvent.save()
        res.json(savedPost)
    }
    catch (err) {
        res.json({ message: err })
    }

})

mongoose.connect(process.env.DATABASE_CONNECTION, () => {
    console.log("connected to mern database")
})

app.post('/generateTickets', async (req, res) => {
    console.log(req)
    const newEvent = req.body
    //const newUser = new UserModel(user)
    const createTickets = new ticketModel(newEvent)

    try {
        const savedPost = await createTickets.save()
        res.json(savedPost)
    }
    catch (err) {
        res.json({ message: err })
    }

})



const port = process.env.PORT 
app.listen(port, () => {
    console.log(`Sever started, Server running on port ${port}`)
})