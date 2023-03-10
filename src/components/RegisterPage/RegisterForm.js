import React, { useState } from 'react'
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
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 h-full w-2/4 flex flex-col' onSubmit={handleSubmit}>
      <p class='block text-gray-700 text-6xl font-bold mb-auto '>Create new account</p>
      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Username
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               type='text' placeholder='Username' value={username}
               onChange={e => setUsername(e.target.value)}/>
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Email
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               type='text' placeholder='Email' value={email}
               onChange={e => setEmail(e.target.value)}/>
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Repeat email
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               type='text' placeholder='Email' value={repeatedEmail}
               onChange={e => setRepeatedEmail(e.target.value)}/>
      </div>

      <div class='mb-6'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Password
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' 
               type='password' placeholder='******************' value={password}
               onChange={e => setPassword(e.target.value)}/>
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Repeat password
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               type='password' placeholder='******************' value={repeatedPassword}
               onChange={e => setRepeatedPassword(e.target.value)}/>
      </div>

      <div class='flex items-center justify-between'>
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline' 
                type='submit'>
          Create account
        </button>

        <div class='flex flex-col items-center justify-between'>
          <a class='font-bold text-2xl text-blue-500 text-center hover:text-blue-800' href='/login'>
            <p>Already have an account?</p>
            <p>Sign in</p>
          </a>  
        </div>
        
      </div>
      
      <p class='text-center text-gray-500 text-xs mt-auto'>
        © 2022 Dancify - dance party organizer. All right reserved | Created by <a class='font-bold' href='https://github.com/adrgor'>@adrgor</a>
      </p>
    </form>
  )
}