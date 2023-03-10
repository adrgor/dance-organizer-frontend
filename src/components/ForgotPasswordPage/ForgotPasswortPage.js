import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'

export default function ForgotPasswordPage() {

  return (
    <>
      <div className='bg-image'></div>      
      <div className='forgot-password-page'>
        <ForgotPasswordForm/>
        <p style={{color: 'black', textAlign: 'center', fontSize: '1.5rem'}}>© 2022 Dancify - dance party organizer. All right reserved | Created by <a href='https://github.com/adrgor' className='github-link'>@adrgor</a></p>
      </div>
    </>

  )
}
