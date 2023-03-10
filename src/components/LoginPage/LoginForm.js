import React from 'react'

export default function LoginForm({setCurrentView}) {
  return (
    <form className='login-form'>
        <p className='title'>Dancify</p>
        <input className='form-input' type='text' placeholder='Login / Email'></input>
        <input className='form-input' type='password' placeholder='Password'></input>
        <button className='form-input form-btn' type='submit'>LOG IN</button>
        <div className='account-links'>
          <a href='/forgot-password'>Forgot password?</a>
          <a href='/register'>Create new account</a>
        </div>
    </form>
  )
}
