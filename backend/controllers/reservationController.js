const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(400).json({ message: 'Rezervasyon oluşturulamadı', error: error.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('flightId');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Rezervasyonlar alınamadı', error: error.message });
  }
};