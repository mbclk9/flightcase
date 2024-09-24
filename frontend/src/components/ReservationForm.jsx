import React, { useState } from 'react';
import { createReservation } from '../api';

const ReservationForm = ({ flight }) => {
  const [passengerName, setPassengerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flight) {
      console.error('Uçuş bilgisi eksik');
      return;
    }
    try {
      await createReservation({
        flightId: flight._id,
        passengerName
      });
      alert('Rezervasyon başarıyla oluşturuldu!');
      setPassengerName('');
    } catch (error) {
      console.error('Rezervasyon oluşturulamadı:', error);
      alert('Rezervasyon oluşturulamadı. Lütfen tekrar deneyin.');
    }
  };

  if (!flight) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        placeholder="Yolcu Adı"
        required
      />
      <button type="submit">Rezervasyon Yap</button>
    </form>
  );
};

export default ReservationForm;