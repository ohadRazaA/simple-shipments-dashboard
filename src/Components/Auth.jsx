import React, { useEffect } from 'react'
import Dashboard from './Dashboard/Dashboard'
import useData from '../hooks/useData';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const { login, setLogin } = useData();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("userEmail")) {
            setLogin(true);
            navigate("/profile");
        }
    }, []);

    return (
        <div>
            {
                login && localStorage.getItem("userId") ?
                    <Dashboard /> :
                    <h1>Please, first do Signup / Login</h1>
            }
        </div>
    )
}

export default Auth
