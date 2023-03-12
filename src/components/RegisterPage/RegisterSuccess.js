import React from 'react'
// import ApiUrl from '../../utils/ApiUrl'

export default function RegisterForm() {
  return (
    <div class='bg-white shadow-md rounded w-1/2 px-8 pt-6 pb-8 text-2xl flex flex-col justify-evenly'>
      <p class='mb-10'>Congratulations! Your account has been created!
      Check your email box and verify your account</p>

      <a class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline text-center'
         href='/login'>
        Go back to login page
      </a>
    </div>
  )
}
