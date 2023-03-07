import React from 'react'
import RegisterForm from './RegisterForm'

export default function RegisterPage() {

  return (
    <>
      <div className="bg-image"></div>      
      <div className="register-page">
        <RegisterForm/>
        <p style={{color: "black", textAlign: "center", fontSize: "1.5rem"}}>© 2022 Dancify - dance party organizer. All right reserved | Created by <a href="https://github.com/adrgor" className="github-link">@adrgor</a></p>
      </div>
    </>

  )
}
