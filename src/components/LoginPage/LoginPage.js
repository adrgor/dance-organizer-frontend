import React from 'react'
import InfoBox from './InfoBox'
import LoginForm from './LoginForm'

export default function LoginPage() {

  return (
    <>
      <div className='bg-image'></div>      
      <div className='login-page'>
        <LoginForm/>
        <InfoBox/>
        <p style={{color: 'black', textAlign: 'center', fontSize: '1.5rem'}}>© 2022 Dancify - dance party organizer. All right reserved | Created by <a href='https://github.com/adrgor' className='github-link'>@adrgor</a></p>
      </div>
    </>

  )
}
