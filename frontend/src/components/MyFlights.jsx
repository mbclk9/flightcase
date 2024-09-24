import React from 'react';

const MyFlightList = ({ departure = {}, arrival = {}, departureTime = '', arrivalTime = '', duration = '', price = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
      {/* Sol taraf: Kalkış Bilgileri */}
      <div>
        <div className="text-xl font-bold">{departureTime || 'Bilinmiyor'}</div>
        <div className="text-lg font-semibold">
          {(departure && departure.city) ? departure.city : 'Bilinmeyen Şehir'} 
          ({departure && departure.code ? departure.code : 'N/A'})
        </div>
        <div className="text-sm text-gray-500">
          {departure && departure.airport ? departure.airport : 'Bilinmeyen Havalimanı'}
        </div>
      </div>

     
      <div className="flex items-center space-x-2">
        <div className="text-sm text-gray-500">Direkt</div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <img src="/path/to/airplane-icon.svg" alt="Airplane Icon" className="w-4 h-4" />
          </div>
          <div className="text-sm text-gray-500">{duration || 'Süre Bilinmiyor'}</div>
        </div>
      </div>

      {/* Sağ taraf: Varış Bilgileri */}
      <div className="text-right">
        <div className="text-xl font-bold">{arrivalTime || 'Bilinmiyor'}</div>
        <div className="text-lg font-semibold">
          {(arrival && arrival.city) ? arrival.city : 'Bilinmeyen Şehir'} 
          ({arrival && arrival.code ? arrival.code : 'N/A'})
        </div>
        <div className="text-sm text-gray-500">
          {arrival && arrival.airport ? arrival.airport : 'Bilinmeyen Havalimanı'}
        </div>
      </div>

      {/* Fiyat ve Detay */}
      <div className="text-right ml-6">
        <div className="text-lg font-bold text-black">{price ? price.toLocaleString() : 'Fiyat Bilinmiyor'} TRY</div>
        <div className="text-blue-500 cursor-pointer">Detay</div>
      </div>
    </div>
  );
};

export default MyFlightList;
