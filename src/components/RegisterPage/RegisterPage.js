import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import RegisterSuccess from './RegisterSuccess'
import HttpCode from '../../utils/HttpCode'

export default function RegisterPage() {

  const [registerStatus, setRegisterStatus] = useState(0)
 
  return (
    <>
      {
        registerStatus === HttpCode.OK ? 
        <RegisterSuccess/> : <RegisterForm registerStatus={registerStatus} setRegisterStatus={setRegisterStatus}/> 
      }
    </>
  )
}
