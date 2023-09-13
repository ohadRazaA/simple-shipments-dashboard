import React, { useEffect, useState } from 'react'
import useData from '../../../hooks/useData'
import './form.css';
import { useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';
import randomstring from 'randomstring';

function Form() {

    const navigate = useNavigate();
    // const [referenceNo, setReferenceNo] = useState("");
    const [firstName, setFisrtName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const [brand, setBrand] = useState("");
    const { allData } = useData();
    let Sno = 20000;
    const randomNo = Math.floor(Math.random() * 900000) + 100000;
    const randomCode = randomstring.generate({
        length: 13,
        charset: 'alphanumeric'
    });

    const addItem = () => {
        const consigneeCity = document.getElementById("cityDropdown");
        const location = document.getElementById("cityDropdown2");

        if (firstName === "" || lastName === "" || phoneNo === "" || amount === "" || consigneeCity.value === "Consignee City" || location.value === "Location" || address === "" || email === "" || brand === "" || date === "") {
            alert("Please Fill All Inputs");
        }
        else {
            ++Sno;
            const obj = {
                fullName: firstName + " " + lastName,
                phoneNo,
                amount,
                address,
                consigneeCity: consigneeCity.value,
                location: location.value,
                trackingNumber: randomCode,
                Sno,
                clientNo: "C" + randomNo,
                email,
                brand,
                date
            }
            allData.push(obj);

            const url = "http://localhost:5000/shipments"
            axios.post(url, obj)
                .then(res => {
                    if (localStorage.getItem("userEmail")) {
                        navigate('/shipments');
                    }
                    else if(localStorage.getItem("adminEmail")){
                        navigate('/admin');
                    }
                })
                .catch(err => console.log({ "err": err }));
        }
    }

    return (
        <div>
            <h2 className='CrtShpmnt'>Create Shipment</h2>
            <div className='Form'>
                <h2>Shipment Information</h2>

                <div className='inputs'>
                    <input className='input'
                        // onChange={e => setReferenceNo(e.target.value)}
                        type="text"
                        placeholder='Reference No' id='' />
                    <select id="cityDropdown">
                        <option value="Consignee City">Consignee City</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sialkot">Sialkot</option>
                    </select>
                    <input className='input'
                        onChange={e => setFisrtName(e.target.value)}
                        type="text"
                        placeholder='Consignee First Name' />
                    <input className='input'
                        onChange={e => setLastName(e.target.value)}
                        type="text"
                        placeholder='Consignee Last Name' />
                    <input className='input'
                        onChange={e => setPhoneNo(e.target.value)}
                        type="number"
                        placeholder='Consignee Phone' />
                    <input className='input'
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder='Consignee Email' />
                    <input className='input'
                        onChange={e => setAddress(e.target.value)}
                        type="text"
                        placeholder='Consignee Address' />
                    <select id="cityDropdown2">
                        <option value="Location">Location</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Multan">Multan</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Peshawar">Peshawar</option>
                        <option value="Quetta">Quetta</option>
                        <option value="Sialkot">Sialkot</option>
                    </select>
                    <input className='input'
                        onChange={e => setAmount(e.target.value)}
                        type="number"
                        placeholder='Amount' />
                    <input className='input'
                        onChange={e => setDate(e.target.value)}
                        type="date" />
                    <input className='input'
                        onChange={e => setBrand(e.target.value)}
                        type="text"
                        placeholder='Brand Name' />
                </div>
            </div>
            <button onClick={addItem} className='add-item'>Add Item</button>
        </div>
    )
}

export default Form
