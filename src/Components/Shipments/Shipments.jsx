import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar';
import './shipments.css';
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import axios from 'axios';

function Shipments() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { allData, setAllData, setLogin } = useData();
    const [filteredData, setFilteredData] = useState(allData);

    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            setLogin(true);
            navigate("/shipments");
            fetchShipments();
        }
        else if (localStorage.getItem("adminEmail")) {
            navigate("/admin");
            fetchShipments();
        }
        else {
            navigate("/login");
        }
    }, []);

    const fetchShipments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/shipments");
            setAllData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching shipments:", error);
        }
    };

    useEffect(() => {
        const filtered = allData.filter(info =>
            info.trackingNumber.toLowerCase().includes(search.toLowerCase())
        );
        filtered.sort((a, b) => {
            const lowerSearch = search.toLowerCase();
            const aStartsWith = a.trackingNumber.toLowerCase().startsWith(lowerSearch);
            const bStartsWith = b.trackingNumber.toLowerCase().startsWith(lowerSearch);

            if (aStartsWith && !bStartsWith) {
                return -1;
            } else if (!aStartsWith && bStartsWith) {
                return 1;
            } else {
                return 0;
            }
        });
        setFilteredData(filtered);
    }, [search, allData]);

    const goToForm = () => {
        navigate('/form');
    }

    const searching = (event) => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <Navbar />

            <ul className='navbar2'>
                <li>Shipments</li>
                <li>Loadsheets</li>
                <li>Invoices</li>
            </ul>
            <br />
            <hr />

            <div>
                <ul className='btns'>
                    <li><button className='nav-btns' onClick={goToForm}>New Shipment</button></li>
                </ul>
            </div>

            <div className='list'>
                <input onChange={searching} className='inp' type="search" placeholder='Search by Tracking Number' />
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr className='table-head'>
                                <th><input type="checkbox" id="" /></th>
                                <th>SrNo</th>
                                <th>Client Order No</th>
                                <th>Booking Date</th>
                                <th>Amount</th>
                                <th>Brand</th>
                                <th>Location</th>
                                <th>Tracking Number</th>
                                <th>Origin City</th>
                                <th>Tracking Status</th>
                                <th>Consignee Name</th>
                                <th>Consignee Phone</th>
                                <th>Consignee City</th>
                            </tr>
                        </thead>
                        <tbody id='t-body'>
                            {filteredData.map((info, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='td'><input type="checkbox" id="" /></td>
                                        <td className='td'>{info.Sno}</td>
                                        <td className='td'>{info.clientNo}</td>
                                        <td className='td'>{info.date}</td>
                                        <td className='td'>{info.amount}</td>
                                        <td className='td'>{info.brand}</td>
                                        <td className='td'>{info.address}</td>
                                        <td className='td'>{info.trackingNumber}</td>
                                        <td className='td'>{info.location}</td>
                                        <td className='td'>Delivered</td>
                                        <td className='td'>{info.fullName}</td>
                                        <td className='td'>{info.phoneNo}</td>
                                        <td className='td'>{info.consigneeCity}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Shipments
