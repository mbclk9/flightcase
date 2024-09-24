const axios = require('axios');

exports.getFlights = async (req, res) => {
  try {
    const { date, direction } = req.query;
    const response = await axios.get('https://api.schiphol.nl/public-flights/flights', {
      headers: {
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_APP_KEY
      },
      params: {
        scheduleDate: date,
        flightDirection: direction
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ message: 'Uçuş bilgileri alınamadı', error: error.message });
  }
};