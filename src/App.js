import './App.css';
import { Route, Routes } from 'react-router-dom';
import Shipments from './Components/Shipments/Shipments';
import Form from './Components/Shipments/Form/Form';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import AdminShipments from './Components/admin Shipment/AdminShipment';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Auth />} />
        <Route path='/shipments' element={<Shipments />} />
        <Route path='/form' element={<Form />} />
        <Route path='/admin' element={<AdminShipments />} />
      </Routes>
    </div>
  );
}

export default App;
