import React, { useState, useEffect } from 'react';
import { getFlights } from '../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [date, setDate] = useState('');
  const [tripType, setTripType] = useState('round');
  const [direction, setDirection] = useState('');
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departure: '',
    return: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (date && direction) {
      fetchFlights();
    }
  }, [date, direction]);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchFlights = async () => {
    try {
      const data = await getFlights(date, direction);
      setFlights(data);
    } catch (error) {
      console.error('Uçuşlar alınamadı:', error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/flights', {
        params: {
          scheduleDate: formData.departure,
          origin: formData.origin,
          destination: formData.destination,
        },
      });
      // API'den gelen uçuşları filtrele
      const filteredFlights = response.data.flights.filter(flight => 
        flight.origin.toLowerCase() === formData.origin.toLowerCase() &&
        flight.destination.toLowerCase() === formData.destination.toLowerCase()
      );
      setFlights(filteredFlights);
    } catch (error) {
      console.error('Error fetching flights:', error);
      alert('Uçuşlar getirilirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async (flight) => {
    try {
      const reservationData = {
        flightId: flight.id,
        departureDate: new Date(flight.scheduleTime),
        origin: flight.origin,
        destination: flight.destination,
      };
      await axios.post('http://localhost:5000/reservations', reservationData);
      alert('Rezervasyonunuz başarıyla kaydedildi!');
      
    } catch (error) {
      console.error('Error making reservation:', error);
      alert('Rezervasyon yapılırken bir hata oluştu.');
    }
  };

  return (
    
    <div>
       <div className="container mx-auto p-6">
      <div className="header">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">PLANE SCAPE</h1>
          <div className="flex space-x-4">
            <button className="p-2 rounded-lg bg-gray-200" onClick={() => navigate('/myflights')}>Profil</button>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-5">
        <div className="flex flex-col flex-1">
          <div className="bg-white p-6 rounded-2xl">
            <div className="flex items-center space-x-4 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="oneway"
                  checked={tripType === 'oneway'}
                  onChange={() => setTripType('oneway')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Tek Yön</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tripType"
                  value="round"
                  checked={tripType === 'round'}
                  onChange={() => setTripType('round')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Gidiş Dönüş</span>
              </label>
            </div>

            <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-center mb-6">
              <div className="flex-1 min-w-[200px] px-2 py-1 flex items-center gap-3 rounded-lg text-left border border-[#edf1f6]">
                <img src="/icons/airplane-takeoff.svg" alt="" width={23} height={23} />
                <div>
                  <label className="block text-gray-600 font-bold">Nereden</label>
                  <input
                    type="text"
                    className="outline-none w-full"
                    placeholder="Seçiniz"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] px-2 py-1 rounded-lg flex items-center gap-3 text-left border border-[#edf1f6]">
                <img src="/icons/airplane-landing.svg" alt="" width={23} height={23} />
                <div>
                  <label className="block text-gray-600 font-bold">Nereye</label>
                  <input
                    type="text"
                    className="outline-none w-full"
                    placeholder="Seçiniz"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] px-2 py-1 flex items-center gap-3 rounded-lg text-left border border-[#edf1f6]">
                <img src="/icons/calendar.svg" alt="" width={20} height={20} />
                <div>
                  <label className="block text-gray-600 font-bold">Gidiş</label>
                  <input
                    type="date"
                    className="outline-none w-full"
                    name="departure"
                    value={formData.departure}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div
                className="flex-1 min-w-[200px] px-2 py-1 flex rounded-lg items-center gap-3 text-left border border-[#edf1f6]"
                style={{
                  cursor: tripType === 'oneway' ? 'not-allowed' : 'pointer',
                }}
              >
                <img src="/icons/calendar.svg" alt="" width={20} height={20} />
                <div>
                  <label className="block text-gray-600 font-bold">Dönüş</label>
                  <input
                    type="date"
                    className="outline-none w-full"
                    name="return"
                    value={formData.return}
                    onChange={handleInputChange}
                    disabled={tripType === 'oneway'}
                    style={{
                      backgroundColor: tripType === 'oneway' ? '#fff' : '#fff',
                    }}
                  />
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg">
                {loading ? 'Aranıyor...' : 'Uçuş Ara'}
              </button>
            </form>
          </div>

          {/* Uçuşlar Listesi */}
          <div className="my-6">
            {flights.length > 0 ? (
              flights.map((flight) => (
                <div key={flight.id} className="bg-white shadow-lg rounded-lg p-4 my-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        {flight.origin} - {flight.destination}
                      </p>
                      <p>Departure: {new Date(flight.scheduleTime).toLocaleString()}</p>
                      <p>Flight Number: {flight.flightNumber}</p>
                    </div>
                    <div>
                      <button 
                        onClick={() => handleReservation(flight)} 
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg"
                        disabled={new Date(flight.scheduleTime) < new Date()}
                      >
                        {new Date(flight.scheduleTime) < new Date() ? 'Geçmiş Uçuş' : 'Rezervasyon Yap'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Henüz uçuş aranmadı veya bulunamadı.</p>
            )}
          </div> 
        </div>

        {/* Sağ kenar çubuğu */}
        <div className="rightbar">
          <div className="grid grid-cols gap-4 w-96">
            <div
              className="relative rounded-lg h-48"
              style={{
                backgroundImage: 'url("/images/car-rentals.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-end bg-black bg-opacity-50 rounded-lg p-4">
                <p className="text-white text-xl font-semibold">Car Rentals</p>
              </div>
            </div>
            <div
              className="relative rounded-lg h-48"
              style={{
                backgroundImage: 'url("/images/hotels.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-end bg-black bg-opacity-50 rounded-lg p-4">
                <p className="text-white text-xl font-semibold">Hotels</p>
              </div>
            </div>
            <div
              className="relative rounded-lg h-48"
              style={{
                backgroundImage: 'url("/images/travel-packages.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 flex items-end bg-black bg-opacity-50 rounded-lg p-4">
                <p className="text-white text-xl font-semibold">Travel Packages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FlightList;