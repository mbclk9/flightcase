const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    flightId:{type:mongoose.Schema.Types.ObjectId, ref:'Flight'},
    passengerName:String,
    reservationDate:{type:Date, default:Date.now}
});

module.exports= mongoose.model('Reservation', ReservationSchema)