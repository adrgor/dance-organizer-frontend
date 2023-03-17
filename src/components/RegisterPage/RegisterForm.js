import React, { useState } from 'react'
import {validateUsername, validateEmail, validatePassword} from '../../utils/FormUtils'
import ApiUrl from '../../utils/ApiUrl'
import HttpCode from '../../utils/HttpCode'
import ErrorPopUp from '../ErrorPopUp'

export default function RegisterForm({registerStatus, setRegisterStatus}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [repeatedEmail, setRepeatedEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')

  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isRepeatedEmailValid, setIsRepeatedEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isRepeatedPasswordValid, setIsRepeatedPasswordValid] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setRegisterStatus(0)
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
      .then(response => {
        if(response.status !== HttpCode.OK) {
          response.json().then(data => setErrorMessage(data.message))
        }
        setRegisterStatus(response.status)
      })
    }
    
  }

  const validateForm = ({username, email, repeatedEmail, password, repeatedPassword}) => {
    setIsUsernameValid(validateUsername(username))
    setIsEmailValid(validateEmail(email))
    setIsRepeatedEmailValid(email === repeatedEmail && validateEmail(email))
    setIsPasswordValid(validatePassword(password))
    setIsRepeatedPasswordValid(password === repeatedPassword && validatePassword(password))

    return validateUsername(username) && validateEmail(email) && validatePassword(password) &&
           email === repeatedEmail && password === repeatedPassword
  }

  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 h-full w-2/4 flex flex-col' onSubmit={handleSubmit}>

      { errorMessage && 
        <ErrorPopUp setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>
      }

      <p class='block text-gray-700 text-6xl font-bold mb-auto '>Create new account</p>
      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Username
        </label>
        <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isUsernameValid ? 'border-red-500' : ''}`}
               type='text' placeholder='Username' value={username}
               onChange={e => setUsername(e.target.value)}/>
        {!isUsernameValid && <p class="text-red-500 text-xs italic">Invalid username. Username needs to be at length must be between 4 and 30 characters</p>}
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Email
        </label>
        <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isEmailValid ? 'border-red-500' : ''}`}
               type='text' placeholder='Email' value={email}
               onChange={e => setEmail(e.target.value)}/>
        {!isEmailValid && <p class="text-red-500 text-xs italic">Invalid email address</p>}
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Repeat email
        </label>
        <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isRepeatedEmailValid ? 'border-red-500' : ''}`}
               type='text' placeholder='Email' value={repeatedEmail}
               onChange={e => setRepeatedEmail(e.target.value)}/>
        {!isRepeatedEmailValid && <p class="text-red-500 text-xs italic">Invalid email address or emails don't match</p>}
      </div>

      <div class='mb-6'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Password
        </label>
        <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isPasswordValid ? 'border-red-500' : ''}`}
               type='password' placeholder='******************' value={password}
               onChange={e => setPassword(e.target.value)}/>
        {!isPasswordValid && <p class="text-red-500 text-xs italic">Invalid password. Password length must be between 6 and 40 characters and cannot contain whitespaces</p>}
      </div>

      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Repeat password
        </label>
        <input class={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${!isRepeatedPasswordValid ? 'border-red-500' : ''}`}
               type='password' placeholder='******************' value={repeatedPassword}
               onChange={e => setRepeatedPassword(e.target.value)}/>
        {!isRepeatedPasswordValid && <p class="text-red-500 text-xs italic">Invalid password or passwords don't match</p>}
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