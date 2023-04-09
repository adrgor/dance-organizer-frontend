import React from 'react'

export default function TransparentPopUp({isActive, setActive, popUpText, onAccept}) {
  return (
    <div className={`w-full h-full bg-gray-50 bg-opacity-50 absolute z-10 left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] ${isActive ? "flex" : "hidden"}`}>
        <div className='bg-white bg-opacity-100 w-1/2 m-auto border border-gray-300 rounded-sm text-center p-5'>
            <p className='text-3xl font-bold p-2'>{popUpText}</p>
            <div className='flex justify-around p-2 mt-5'>
                <div onClick={() => setActive(false)} className='bg-blue-500 hover:bg-blue-700 px-4 w-1/3 py-2 text-2xl font-bold text-white rounded-sm border'>
                    No
                </div>
                <div onClick={() => {onAccept(); setActive(false)}} className='bg-blue-500 hover:bg-blue-700 px-4 w-1/3 py-2 text-2xl font-bold text-white rounded-sm border'>
                    Yes
                </div>
            </div>
        </div>
    </div>
  )
}
