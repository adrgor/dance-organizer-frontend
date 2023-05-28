import React, { useEffect, useState } from 'react'
import TopBar from '../GeneralUseComponents/TopBar'
import DescriptionEditor from '../EventDetails/DesriptionEditor'
import { useNavigate, useParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'
import TransparentPopUp from '../GeneralUseComponents/TransparentPopUp'
import LoadingSpinner from '../GeneralUseComponents/LoadingSpinner'

export default function EventDetails() {

  const { id } = useParams()
  const [eventDetails, setEventDetails] = useState({})
  const [isOwned, setOwned] = useState(false)
  const [isActionBtnClicked, setActionBtnClicked] = useState(false)
  const [isPopUpActive, setPopUpActive] = useState(false)
  const [popUpText, setPopUpText] = useState("")
  const [acceptFunction, setAcceptFunction] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isRegistrationOpen, setRegistrationOpen] = useState(false)

  const startingDate = new Date(eventDetails.startingDate)
  const endingDate = new Date(eventDetails.endingDate)
  const [startYear, startMonth, startDate] = [startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate()]
  const [endYear, endMonth, endDate] = [endingDate.getFullYear(), endingDate.getMonth(), endingDate.getDate()]

  const navigate = useNavigate()

  const handleOnActionBtnClicked = () => {
    setActionBtnClicked(!isActionBtnClicked)
  }

  const handlePopUpActivate = (text, acceptFunction) => {
    setPopUpText(text)
    setPopUpActive(true)
    setAcceptFunction(acceptFunction)
  }

  const deleteEvent = () => {

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
    }

    fetch(`${ApiUrl.EVENT_RESOURCE}/${id}`, requestOptions)
    .then(res => navigate("/my-events"))
  }

  const publishEvent = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
    }

    fetch(`${ApiUrl.CHANGE_STATUS}/${id}`, requestOptions)
    navigate("/my-events")
  }

  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        },
    }

    Promise.all([
      fetch(`${ApiUrl.EVENT_RESOURCE}/${id}`, requestOptions)
      .then(response => response.json()),

      fetch(`${ApiUrl.FORM}?eventId=${id}`, requestOptions)
      .then(response => response.json())
      .catch(err => ({isOpen: false}))
    ]).then( ([eventData, formData]) => {
      setEventDetails(eventData)
      setOwned(eventData.owned)
      setRegistrationOpen(formData.isOpen)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className='w-screen h-full overflow-auto'>
      <TopBar />
      <TransparentPopUp isActive={isPopUpActive} popUpText={popUpText} setActive={setPopUpActive} onAccept={acceptFunction}/>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mt-5 w-10/12">
        <div className='min-h-[80%] bg-white p-5 flex flex-col'>
          {isLoading ?
           <LoadingSpinner/>
          :
            <>
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
                  <div>
                    <a href="/events" class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                      Back
                    </a>
                  </div>

                  {isOwned ? 
                    <div className='relative' onClick={handleOnActionBtnClicked}>
                      <div className={`absolute bottom-[150%] w-72 right-0 ${isActionBtnClicked ? 'flex flex-col' : 'hidden'} border border-gray-300 bg-gray-50 p-2 text-2xl font-bold rounded-sm`}>
                        <a href={`/edit-event/${id}`} className='p-2 hover:bg-gray-100'>Edit</a>
                        <a href="#" onClick={() => handlePopUpActivate("Are you sure you want to publish the event?", () => publishEvent)} className='p-2 hover:bg-gray-100'>
                          {eventDetails.status == "DRAFT" ? "Publish" : "Revert to draft"}
                        </a>
                        <a href={`/registration-dashboard?eventId=${eventDetails.eventId}`} className='p-2 hover:bg-gray-100'>Manage registration</a>
                        <a href="#" onClick={() => handlePopUpActivate("Are you sure you want to delete the event?", () => deleteEvent)} className='p-2 hover:bg-gray-100'>Delete</a>
                      </div>
                      <a href="#" class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                        Actions
                      </a>
                    </div> 
                    :
                    <div>
                      {isRegistrationOpen ? 
                        <a href={`/register-for-event?eventId=${id}`} class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                          Register
                        </a>
                        :
                        <div class='bg-gray-400 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'>
                          Registration closed
                        </div>
                      }
                      
                    </div>
                  }
            </div>
            </>
          }

          
        </div>    
      </div>
    </div>
  )
}
