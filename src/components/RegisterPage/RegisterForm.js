import React from 'react'
import './RegisterPage.css'

export default function RegisterForm() {
  return (
    <form className="register-form">
        <p className='title-registration'>Dancify</p>
        <input className="form-input-registration" type="text" placeholder="Login"></input>
        <input className="form-input-registration" type="text" placeholder="Email"></input>
        <input className="form-input-registration" type="text" placeholder="Repeat Email"></input>
        <input className="form-input-registration" type="password" placeholder="Password"></input>
        <input className="form-input-registration" type="password" placeholder="Repeat Password"></input>
        <button className="form-input-registration form-btn" type="submit">CREATE ACCOUNT</button>
        <div className="account-links">
          <a href="/login">Already have an account?</a>
        </div>
    </form>
  )
}
