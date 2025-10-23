import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { handleError, handleSuccess} from '../utils';
const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  console.log(signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    const {name ,email , password} = signupInfo;
    if(!name || !email ||!password){
      return handleError("name , email and password are required");
    }
    try{
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "content-type": "application/json"
        },
        body : JSON.stringify(signupInfo),
      })
      const result = await response.json();
      const {success,message,error} = result;
      if(success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0];
        handleError(details.message);
      } else if(!success) {
        handleError(message);
      }
      console.log(result);
    }catch(err){
      handleError(err);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
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
            placeholder='enter your name'
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
            placeholder='enter your email'
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            name='password'
            onChange={handleChange}
            value={signupInfo.password}
            placeholder='enter your password'
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
