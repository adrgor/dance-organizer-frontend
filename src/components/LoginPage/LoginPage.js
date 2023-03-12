import React from 'react'
import InfoBox from './InfoBox'
import LoginForm from './LoginForm'

export default function LoginPage() {

  return (
      <div className='h-3/5 w-3/4 bg-slate-900/[0.9] flex items-center'>
        <LoginForm/>
        <InfoBox/>
      </div>
  )
}
