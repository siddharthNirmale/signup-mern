import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login({ setIsAuthenticated }) { // Receive setIsAuthenticated as prop

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('Email and password are required');

        try {
            const url = `https://signup-mern-six.vercel.app/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, name, error ,token} = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', token);
                localStorage.setItem('loggedInUser', name);
                setIsAuthenticated(true); // Update auth state immediately
                setTimeout(() => navigate('/home'), 500);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }

        } catch (err) {
            handleError(err.message || err);
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                </div>
                <button type='submit'>Login</button>
                <span>
                    Don't have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
