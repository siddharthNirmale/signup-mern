import React from 'react'
import { Link } from 'react-router-dom'
import {ToastContainer, toast} from "react-toastify"

const login = () => {

  

  return (
    <div className='container'>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type="email" 
          name='email'
          autoFocus
          placeholder='enter your email' /> 
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input type="password" 
          name='password'
          autoFocus
          placeholder='enter your password' /> 
        </div>
        <button type='submit'>Login</button>
        <span>Dont have an account? <Link to="/signup" >Signup</Link></span>
      </form>
      <ToastContainer />
      

      
    </div>
  )
}

export default login