import React from 'react'
import InfoBox from './InfoBox'
import LoginForm from './LoginForm'

export default function LoginPage() {

  return (
    <div className='h-14 bg-gradient-to-r from-cyan-500 to-blue-500 h-full flex flex-col items-center justify-evenly'>
      <div className='h-3/5 w-3/4 bg-slate-900 flex items-center'>
        <LoginForm/>
        <InfoBox/>
        {/* <LoginForm/> */}
        {/* <InfoBox/> */}
        {/* <p style={{color: 'black', textAlign: 'center', fontSize: '1.5rem'}}>© 2022 Dancify - dance party organizer. All right reserved | Created by <a href='https://github.com/adrgor' className='github-link'>@adrgor</a></p> */}
      </div>
    </div>

  )
}
