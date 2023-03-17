import React, { useState } from 'react'
import ErrorPopUp from '../ErrorPopUp'
import InfoBox from './InfoBox'
import LoginForm from './LoginForm'

export default function LoginPage() {

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
      { errorMessage && 
        <ErrorPopUp setErrorMessage={setErrorMessage} errorMessage={errorMessage}/>
      
      }
      <div className='h-3/5 w-3/4 bg-slate-900/[0.9] flex items-center'>
        <LoginForm setErrorMessage={setErrorMessage}/>
        <InfoBox/>
      </div>
    </>
      
  )
}
