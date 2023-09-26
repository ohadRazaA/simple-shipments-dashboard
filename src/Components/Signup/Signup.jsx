import React, { useEffect, useState } from 'react'
import useData from '../../hooks/useData'
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { data, setData, setLogin } = useData();
    const url = "http://localhost:5000/user/";

    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            setLogin(true);
            navigate("/profile");
        }
        else if (localStorage.getItem("adminEmail")) {
            navigate("/admin");
        }
    }, []);

    const goToLogin = () => {
        navigate('/login');
    }

    const dataSubmitted = () => {
        if (firstName === "" || lastName === "" || email === "" || password === "") {
            alert("Please fill all inputs");
        }
        else {
            data.push({
                firstName,
                lastName,
                email,
                password
            });
            axios.post(url, { email, password, firstName, lastName })
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("userId", res.data._id);
                })
                .catch((error) => { console.log("Error:", error); });
            navigate('/login');
            // localStorage.setItem("userEmail", email);
        }

    }

    return (
        <div className='sign-up'>
            <div className='allInputs'>
                <h1>Sign Up</h1>
                <input type="text"
                    className='inputs'
                    placeholder='First Name'
                    onChange={e => { setFirstName(e.target.value) }}
                    value={firstName} />

                <br />

                <input type="text"
                    className='inputs'
                    placeholder='Last Name'
                    onChange={e => { setLastName(e.target.value) }}
                    value={lastName} />

                <br />

                <input type="email"
                    className='inputs'
                    placeholder='Email'
                    onChange={e => { setEmail(e.target.value) }}
                    value={email} />

                <br />

                <input type="password"
                    className='inputs'
                    placeholder='Password'
                    onChange={e => { setPassword(e.target.value) }}
                    value={password} />

                <br />

                <button className='submitBtn' onClick={dataSubmitted}>Submit</button><br />
                <div className='one'>
                    <button onClick={goToLogin} className='account-already-exist'>Account Already exist / login as Admin</button>
                </div>
            </div>
        </div>
    )
}

export default Signup
