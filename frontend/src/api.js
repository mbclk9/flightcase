import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getFlights = async(date, direction) =>{
    const response = await axios.get(`${API_URL}/flights`, { params: { date, direction } });
    return response.data;
}

export const createReservation = async (reservationData) => {
    const response = await axios.post(`${API_URL}/reservations`, reservationData);
    return response.data;
  };
  
  export const getReservations = async () => {
    const response = await axios.get(`${API_URL}/reservations`);
    return response.data;
  };