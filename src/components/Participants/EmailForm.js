import React, { useState } from 'react'
import DescriptionEditor from '../EventDetails/DesriptionEditor'

export default function EmailFrom({isActive, setActive, sendEmail}) {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

  return (
    <div className={`w-full h-full bg-gray-50 bg-opacity-50 absolute z-10 left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] ${isActive ? "flex" : "hidden"}`}>
        <div className='bg-white bg-opacity-100 w-1/2 m-auto border border-gray-300 rounded-sm p-5 relative'>
            <svg
                className="w-7 hover:cursor-pointer absolute right-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setActive(false)}
                >
                <path
                    d="M16 8L8 16M8.00001 8L16 16"
                    stroke="rgb(107 114 128)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <input placeholder='Title' className='text-2xl p-3 border active:outline-none focus:outline-none w-2/3'
                   value={title} onChange={(e) => setTitle(e.target.value)}/>
            <DescriptionEditor value={body} setValue={setBody}/>
            <div className='flex justify-around p-2 mt-5'>
                <div onClick={() => sendEmail(title, body)}
                    className='bg-blue-500 hover:bg-blue-700 px-4 w-1/3 py-2 text-2xl font-bold text-white rounded-md border text-center'>
                    Send email
                </div>
            </div>
        </div>
    </div>
  )
}
