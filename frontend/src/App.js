import './App.css';
import FlightList from './components/FlightList.jsx'
import MyFlights from './components/MyFlights.jsx'
import ReservationForm from "./components/ReservationForm.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FlightList />} /> {/* Anasayfa */}
          <Route path="/myflights" element={<MyFlights />} /> {/* Profil sayfası */}
        </Routes>
      </Router>
        <ReservationForm/>
    </div>
  );
}

export default App;
