import React from 'react'
import TopBar from '../GeneralUseComponents/TopBar'
import { useNavigate } from 'react-router-dom'

export default function RegistrationConfirmed() {
    const navigate = useNavigate()
  return (
    <div className='w-full h-full'>
            <TopBar/>
            <div className='m-auto mt-5 bg-white w-1/2 p-5'>
                <p className='text-5xl font-bold p-5'>Thank you for registering</p>
                <p className='text-2xl pl-5'>Organizators have recieved your registration!</p>
                <p className='text-2xl pl-5'>You can now exit this page now or browse more events</p>
                <button onClick={() => navigate("/events")}
                        className='m-auto bg-blue-500 rounded-md block p-5 text-2xl text-white font-bold hover:bg-blue-700 mt-5'>Browse events</button>
            </div>
        </div>
  )
}
