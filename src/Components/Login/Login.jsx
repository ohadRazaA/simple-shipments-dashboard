import React, { useEffect, useState } from 'react'
import useData from '../../hooks/useData'
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setLogin } = useData();

    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            setLogin(true);
            navigate("/profile");
        }
        else if(localStorage.getItem("adminEmail")){
            navigate("/admin");
        }
    }, []);

    const goToSignup = () => {
        navigate('/');
    }

    const dataSubmitted = () => {
        const url = "http://localhost:5000/authenticate-user/"
        const userData = {
            userEmail,
            password
        }
        if (userEmail === "" || password === "") {
            alert("Please fill all inputs");
        }
        else {
            axios.post(url, userData)
                .then(res => {
                    console.log(res.data);
                    setLogin(true);
                    navigate('/profile');
                    localStorage.setItem("userEmail", userEmail);
                })
                .catch(err => console.log("err:", err));
        }

    }
    const loginAsAdmin = () => {
        if(userEmail === "admin@admin.com" && password === "admin123"){
            navigate('/admin');
            localStorage.setItem("adminEmail", "admin@admin.com");
        }
        else{
            alert("Admin's Email is: 'admin@admin.com'");
            alert("Admin's Password is: 'admin123'");
        }
    }
    return (
        <div className='login'>
            <div className='allInputs'>
                <h1>Login</h1>
                <input type="email"
                    className='inputs'
                    placeholder='Email'
                    onChange={e => { setUserEmail(e.target.value) }}
                    value={userEmail} />

                <br />

                <input type="password"
                    className='inputs'
                    placeholder='Password'
                    onChange={e => { setPassword(e.target.value) }}
                    value={password} />

                <br />
                <div className='btn'>
                    <button className='submitBtn' onClick={dataSubmitted}>Login</button>
                    <button className='submitBtn' onClick={loginAsAdmin}>Login as admin</button>
                </div>
                <div className='one'>
                    <button onClick={goToSignup} className='account-already-exist'>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default Login
