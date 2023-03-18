import React, { useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import Form from '../components/Form';

const Auth = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [_, setCookies] = useCookies(['access_token']);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login', 
                { username, password },
            );
            setCookies('access_token', response.data.token);
            window.localStorage.setItem('userId', response.data.userId);
            setUsername('');
            setPassword('');
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={handleSubmit}
        />
    );
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                'http://localhost:5000/auth/register', 
                { username, password },
            );
            setUsername('');
            setPassword('');
            alert('Registration completed! Now you have to login.');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Form 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Register"
            onSubmit={handleSubmit}
        />
    );
}

export default Auth;
