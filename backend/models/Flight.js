const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightNumber: String,
    airline : String,
    departure : {
        airport: String,
        scheduledTime : Date
    },
    arrival:{
        airport: String,
        scheduledTime:Date
    },
    status:String

});

module.exports= mongoose.model('Flight', FlightSchema);