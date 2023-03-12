import React from 'react'

export default function ForgotPasswordPage() {

  return (
    <form className='bg-white shadow-md rounded h-1/3 w-1/2 px-8 pt-6 pb-8 text-2xl flex flex-col justify-evenly'>
      
      <div class='mb-4'>
        <label class='block text-gray-700 text-2xl font-bold mb-2'>
          Username or Email
        </label>
        <input class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
               type='text' placeholder='Username / Email'/>
      </div>

      <div class='flex items-center justify-between'>
        <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline' 
                type='submit'>
          Reset password
        </button>

        <div class='flex flex-col items-center justify-between'>
          <a class='font-bold text-2xl text-blue-500 hover:text-blue-800' href='/login'>
            Try to sign in
          </a>  
          <a class='font-bold text-2xl text-blue-500 hover:text-blue-800' href='/register'>
            Create new account
          </a>  
        </div>
        
      </div>
      
      <p class='text-center text-gray-500 text-xs mt-auto'>
        © 2022 Dancify - dance party organizer. All right reserved | Created by <a class='font-bold' href='https://github.com/adrgor'>@adrgor</a>
      </p>
    </form>
  )
}
