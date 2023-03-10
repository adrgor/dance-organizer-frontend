import React, { useState } from 'react'
import './RegisterPage.css'
import {validateUsername, validateEmail, validatePassword} from '../../utils/FormUtils'
import ApiUrl from '../../utils/ApiUrl'

export default function RegisterForm({setRegisterStatus}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [repeatedEmail, setRepeatedEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(validateForm({username, email, repeatedEmail, password, repeatedPassword})) {
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password}),
      }
      
      fetch(ApiUrl.REGISTER, requestOptions)
      .then(response => setRegisterStatus(response.status))
    }
    
  }

  const validateForm = ({username, email, repeatedEmail, password, repeatedPassword}) => {
    return validateUsername(username) && validateEmail(email) && validatePassword(password) &&
           email === repeatedEmail && password === repeatedPassword
  }

  return (
    <form className='register-form' onSubmit={handleSubmit}>
        <p className='title-registration'>Dancify</p>

        <input className='form-input-registration' 
               type='text' placeholder='Username'
               value={username}
               onChange={e => setUsername(e.target.value)}/>

        <input className='form-input-registration' 
               type='text' placeholder='Email'
               value={email}
               onChange={e => setEmail(e.target.value)}/>

        <input className='form-input-registration' type='text' 
               placeholder='Repeat Email'
               value={repeatedEmail}
               onChange={e => setRepeatedEmail(e.target.value)}/>

        <input className='form-input-registration' 
               type='password' placeholder='Password'
               value={password}
               onChange={e => setPassword(e.target.value)}/>

        <input className='form-input-registration'
               type='password' placeholder='Repeat Password'
               value={repeatedPassword}
               onChange={e => setRepeatedPassword(e.target.value)}/>
         
        <button className='form-input-registration form-btn' type='submit'>
          CREATE ACCOUNT
        </button>
        
        <div className='account-links'>
          <a href='/login'>Already have an account?</a>
        </div>
    </form>
  )
}
