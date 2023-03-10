import React from 'react'

export default function ForgotPasswordForm({setCurrentView}) {
  return (
    <form className='forgot-password-form'>
        <p className='title'>Dancify</p>
        <input className='form-input' type='text' placeholder='Email'></input>
        <button className='form-input form-btn' type='submit'>RESET PASSWORD</button>
        <div className='account-links'>
          <a href='/login'>Try to log in</a>
          <a href='/register'>Create new account</a>
        </div>
    </form>
  )
}
