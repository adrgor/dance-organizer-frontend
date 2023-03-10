import React, { useState } from 'react'
import './RegisterPage.css'
import ApiUrl from '../../utils/ApiUrl'

export default function RegisterForm() {
  return (
    <div className={['notification-box']}>
      Congratulations! Your account has been created!
      Check your email box and verify your account
    </div>
  )
}
