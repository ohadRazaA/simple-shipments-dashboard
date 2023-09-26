import React from 'react'
import './navbar.css';
import useData from '../../hooks/useData'
import { useNavigate, NavLink } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const { setLogin } = useData();

    if (localStorage.getItem("userEmail")) {
        setLogin(true);
    }
    const logout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
        setLogin(false);
        navigate("/login");
    }
    return (
        <div className='Navbar3'>
            <ul className='navbar'>
                <li><NavLink className='li' to="/profile">Dashboard</NavLink></li>
                <li><NavLink className='li' to="/shipments">Shipments</NavLink></li>
                <li>Customer Suppport</li>
                <li>Profile</li>
            </ul>
            <li><button onClick={logout} className='logoutBtn'>Logout</button></li>
        </div>
    )
}

export default Navbar
