import React from 'react';
import MyFlightList from './MyFlights'; // MyFlightList bileşenini içeri aktar

const FlightSearch = () => {
  const departure = {
    city: "İstanbul",
    code: "SAW",
    airport: "Sabiha Gökçen Havalimanı"
  };

  const arrival = {
    city: "Samsun",
    code: "SZF",
    airport: "Çarşamba Havalimanı"
  };

  console.log('Departure:', departure);  // Veriyi kontrol etmek için
  console.log('Arrival:', arrival);  // Veriyi kontrol etmek için

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">İstanbul → Samsun Uçuşunuz</h2>
      <MyFlightList
        departure={departure}
        arrival={arrival}
        departureTime="01:20"
        arrivalTime="02:50"
        duration="1s 30d"
        price={1209.61}
      />
    </div>
  );
};

export default FlightSearch;
