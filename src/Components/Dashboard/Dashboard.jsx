import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar';
import './dashboard.css';
import useData from '../../hooks/useData';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const { allData, setAllData } = useData();

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/shipments");
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const goToShipments = () => {
    navigate('/shipments')
  }

  return (
    <div>
      <Navbar />
      <h2 className='account-summary-heading'>Account Summary</h2>
      <div className='account-summary'>
        <div onClick={goToShipments} className='account-summary-items'>
          <i className="items-logo fa-solid fa-truck fa-2xl"></i>
          <div className='items-text'>
            <p>Total Shipments</p>
            <p style={{ textAlign: "end" }}>{allData.length}</p>
          </div>
        </div>
        <div className='account-summary-items'>
          <i className="items-logo fa-solid fa-handshake-simple fa-2xl"></i>
          <div className='items-text'>
            <p>Delivered</p>
            <p style={{ textAlign: "end" }}>0</p>
          </div>
        </div>
        <div className='account-summary-items'>
          <div>
            <i style={{ display: "block", marginLeft: "24px" }} className="items-logo fa-solid fa-cube fa-sm"></i>
            <i style={{ display: "block", fontSize: "40px" }} className="items-logo fa-solid fa-rotate-left fa-2xl"></i>
          </div>
          <div className='items-text'>
            <p>Returns</p>
            <p style={{ textAlign: "end" }}>0</p>
          </div>
        </div>
        <div className='account-summary-items'>
          <i className="items-logo fa-solid fa-id-card fa-2xl"></i>
          <div className='items-text'>
            <p>NCI</p>
            <p style={{ textAlign: "end" }}>0</p>
          </div>
        </div>
        <div className='account-summary-items'>
          <i className="items-logo fa-solid fa-wallet fa-2xl"></i>
          <div className='items-text'>
            <p>Total COD (Rs)</p>
            <p style={{ textAlign: "end" }}>0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard