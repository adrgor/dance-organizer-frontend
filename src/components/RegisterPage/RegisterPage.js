import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import RegisterSuccess from './RegisterSuccess'

export default function RegisterPage() {

  const [registerStatus, setRegisterStatus] = useState(0)
 
  let content = <RegisterForm setRegisterStatus={setRegisterStatus}/>
  if(registerStatus === 200) {
    content = <RegisterSuccess/>
  }

  return (
    <>
      <div className='bg-image'></div>      
      <div className='register-page'>

        {content}

        <p style={{color: 'black', textAlign: 'center', fontSize: '1.5rem'}}>© 2022 Dancify - dance party organizer. All right reserved | Created by <a href="https://github.com/adrgor" className="github-link">@adrgor</a></p>
        {registerStatus}
      </div>
    </>

  )
}
