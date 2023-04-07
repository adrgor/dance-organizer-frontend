import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TopBar from './TopBar'
import DescriptionEditor from '../EventDetails/DesriptionEditor'
import { useParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'

export default function EventDetails() {

  const { id } = useParams()
  const [eventDetails, setEventDetails] = useState({})

  const startingDate = new Date(eventDetails.startingDate)
  const endingDate = new Date(eventDetails.endingDate)
  const [startYear, startMonth, startDate] = [startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate()]
  const [endYear, endMonth, endDate] = [endingDate.getFullYear(), endingDate.getMonth(), endingDate.getDate()]


  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
    }
    fetch(`${ApiUrl.EVENT_RESOURCE}/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => setEventDetails(data))
}, [])

  return (
    <div className='w-screen h-full overflow-auto'>
      <TopBar />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mt-5 w-10/12">

        <div className='min-h-[80%] bg-white p-5 flex flex-col'>
          <div className='flex items-center justify-between'>
            <p className='text-5xl w-1/2 p-5 mb-5 leading-5 focus:outline-none'>{eventDetails.name}</p>
            <div className='w-1/3 text-2xl flex flex-col items-center'>
              <p>{`From ${startYear}/${startMonth}/${startDate}`}</p>
              <p>{`To ${endYear}/${endMonth}/${endDate}`}</p>
            </div>
          </div>

          <div className='flex items-end'>
            <p className='text-3xl text-gray-500 pl-5 focus:outline-none'>{eventDetails.country}</p>
            <p className='text-xl text-gray-500 pl-3 focus:outline-none'>{eventDetails.city}</p>
          </div>
          
          <DescriptionEditor value={eventDetails.description} disabled/>

          <p className='text-xl'>Event type</p>
          <div class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">{eventDetails.eventType}</div>

          <p className='text-xl mt-5'>Dance style</p>
          <div class="mt-1 mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5">
            {eventDetails.danceStyles && eventDetails.danceStyles.map((danceStyle) => {
              return <p>{danceStyle}</p>
            })}
          </div>

          <div className='flex justify-between'>
              <a href="/events" class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                Back
              </a>
            <div>
              <a href="#" class='mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                Add to favorites
              </a>
              <a href="#" class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                Register
              </a>
            </div>
          </div>

        </div>
    
      </div>
    </div>
  )
}
