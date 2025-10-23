import React from 'react'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"


const signup = () => {
  return (
    <div className="container">
      <h1>SignUp</h1>
      <form>
        <div>
          <label htmlFor='name'>Name:</label>
          <input type="text"
            name='name'
            autoFocus
            placeholder='enter your name' />
        </div>
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
        <button type='submit'>SignUp</button>

        <span >Already have an account? <Link to='/login'>Login</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default signup