import React from 'react'

export default function InfoBox() {
  return (
    <div className='w-1/2 h-full text-slate-50 text-2xl flex flex-col items-center justify-evenly font-serif m-auto'>

      <p className='text-6xl'>Dancify</p>

      <p>Dancify is an always free app that makes it easy to:</p>
      
      <ul>
          <li>Create dance events in your area</li>
          <li>Create registration form</li>
          <li>Manage registrations</li>
          <li>Send personalized emails to the paricipants</li>
          <li>Browse dance events in your area</li>
          <li>And much more!</li>
      </ul>

      {/* <p>Use test user: Username: user, Password: password</p> */}
      <p>Start using dencify now, log in, create a new account, or <a href='/events' style={{color: '#638FFF'}}>BROWSE AS A GUEST</a></p>
    </div>
  )
}
