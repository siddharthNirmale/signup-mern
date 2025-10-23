import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from '../utils';

const Signup = ({ setIsAuthenticated }) => { // Receive setIsAuthenticated as prop
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) return handleError("Name, email, and password are required");

        try {
            const url = "https://signup-mern-six.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo),
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setIsAuthenticated(true); // Immediately mark as authenticated
                setTimeout(() => navigate("/home"), 1000);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container">
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type="text"
                        name='name'
                        onChange={handleChange}
                        value={signupInfo.name}
                        placeholder='Enter your name'
                        autoFocus
                    />
                </div>

                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        name='email'
                        onChange={handleChange}
                        value={signupInfo.email}
                        placeholder='Enter your email'
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type="password"
                        name='password'
                        onChange={handleChange}
                        value={signupInfo.password}
                        placeholder='Enter your password'
                    />
                </div>

                <button type='submit'>SignUp</button>
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </form>

            <ToastContainer />
        </div>
    );
};

export default Signup;
