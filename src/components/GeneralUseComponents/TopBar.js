import React, { useEffect, useState } from "react";

export default function TopBar() {
  const [jwt, setJwt] = useState('')

  useEffect(() => {
    setJwt(localStorage.getItem('jwt'))
  }, [])

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="http://localhost:3000/events" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            <img src='/dancify.png' className="h-9"/>
          </span>
        </a>

        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg"
            />
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <a
                href="/events"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Browse Events
              </a>
            </li>
            <li>
              {jwt ? 
                <a
                  href="/my-events"
                  className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  My events
                </a> 
              :
                <p className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">
                  My events
                </p>
              }
            </li>
            <li>
              {jwt ? 
                <a
                href="/add-event"
                className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Add event
                </a>
                :
                <p className="block py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0">
                  Add event
                </p>
              }
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
