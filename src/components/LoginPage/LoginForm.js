import React from 'react'

export default function LoginForm({setCurrentView}) {
  return (
    <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 w-2/5 h-full flex flex-col'>
      <p class="block text-gray-700 text-6xl font-bold mb-auto ">Login</p>

      <div class="mb-4">
        <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
          Username or Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username / Email"/>
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-2xl font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"/>
      </div>

      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline" type="button">
          Sign In
        </button>

        <div class="flex flex-col items-center justify-between">
          <a class="font-bold text-2xl text-blue-500 hover:text-blue-800" href="/forgot-password">
            Forgot Password?
          </a>  
          <a class="font-bold text-2xl text-blue-500 hover:text-blue-800" href="/register">
            Create new account
          </a>  
        </div>
        
      </div>
      <p class="text-center text-gray-500 text-xs mt-auto">© 2022 Dancify - dance party organizer. All right reserved | Created by <a href='https://github.com/adrgor'>@adrgor</a></p>
    </form>
  )
}
