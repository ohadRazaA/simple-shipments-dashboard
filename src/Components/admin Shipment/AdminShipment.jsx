import React, { useEffect, useState } from 'react'
import '../Shipments/shipments.css';
import { useNavigate } from 'react-router-dom';
import useData from '../../hooks/useData';
import axios from 'axios';

function AdminShipments() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [editShipmentId, setEditShipmentId] = useState(null);
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

    const deleteShipment =  (shipmentId) => {
            axios.delete(`http://localhost:5000/shipments/${shipmentId}`);
            fetchShipments();
    }

    const editShipment = (shipmentId) => {
        setEditShipmentId(shipmentId);
    }
    const saveChangedShipment = (shipmentId) => {
        const editedShipment = filteredData.find((info) => info._id === shipmentId);
        axios.put(`http://localhost:5000/shipments/${shipmentId}`, editedShipment)
            .then((res) => {
                setEditShipmentId(null);
                fetchShipments();
            })
            .catch(err => console.log(err));
    }
    const cancel = () => {
        setEditShipmentId(null);
    }

    const handleInputChange = (e, shipmentId) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedData = filteredData.map((info) => {
            if (info._id === shipmentId) {
                return {
                    ...info,
                    [name]: value,
                };
            }
            return info;
        });
        setFilteredData(updatedData);
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
    const logout = () => {
        localStorage.removeItem("adminEmail");
        navigate("/login");
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                <ul className='navbar2'>
                    <li>Shipments</li>
                    <li>Loadsheets</li>
                    <li>Invoices</li>
                </ul>
                <li style={{listStyle: "none"}}><button onClick={logout} className='logoutBtn'>Logout</button></li>
            </div>
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id='t-body'>
                            {filteredData.map((info, index) => {
                                const isEditing = info._id === editShipmentId;
                                return (
                                    <tr key={index}>
                                        <td className='td'><input type="checkbox" id="" /></td>
                                        <td className='td'>{info.Sno}</td>
                                        <td className='td'>{info.clientNo}</td>
                                        <td className='td'>{
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name='date'
                                                    onChange={(e) => handleInputChange(e, info._id)}
                                                    value={info.date}
                                                />
                                            ) : (
                                                info.date
                                            )

                                        }</td>
                                        <td className='td'>{
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name='amount'
                                                    onChange={(e) => handleInputChange(e, info._id)}
                                                    value={info.amount}
                                                />
                                            ) : (
                                                info.amount
                                            )
                                        }</td>
                                        <td className='td'>{info.brand}</td>
                                        <td className='td'>{
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name='address'
                                                    onChange={(e) => handleInputChange(e, info._id)}
                                                    value={info.address}
                                                />
                                            ) : (
                                                info.address
                                            )

                                        }</td>
                                        <td className='td'>{info.trackingNumber}</td>
                                        <td className='td'>{info.location}</td>
                                        <td className='td'>Delivered</td>
                                        <td className='td'>{info.fullName}</td>
                                        <td className='td'>{
                                            isEditing ? (
                                                <input
                                                    type="text"
                                                    name='phoneNo'
                                                    onChange={(e) => handleInputChange(e, info._id)}
                                                    value={info.phoneNo}
                                                />
                                            ) : (
                                                info.phoneNo
                                            )

                                        }</td>
                                        <td className='td'>{info.consigneeCity}</td>
                                        <td className='td'>
                                            {
                                                isEditing ? (
                                                    <div>
                                                        <button onClick={() => saveChangedShipment(info._id)} className='delete-btn'>
                                                            Save
                                                        </button>
                                                        <br />
                                                        <button onClick={() => cancel(info._id)} className='delete-btn'>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <button onClick={() => { deleteShipment(info._id) }} className='delete-btn'>Delete</button> <br />
                                                        <button
                                                            onClick={() => editShipment(info._id)} className='delete-btn'>Edit</button>
                                                    </div>
                                                )
                                            }

                                        </td>
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

export default AdminShipments
