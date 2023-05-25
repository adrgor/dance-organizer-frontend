import React, { useEffect, useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import TopBar from '../GeneralUseComponents/TopBar'
import countries from '../../countries.json'
import Datepicker from 'react-tailwindcss-datepicker'
import DescriptionEditor from './DesriptionEditor'
import danceStyles from '../../utils/DanceStyles'
import ItemsSelect from '../FormComponents/ItemsSelect'
import ApiUrl from '../../utils/ApiUrl'
import eventTypes from '../../utils/EventTypes'
import { useParams } from 'react-router-dom'

export default function EditEvent() {

  const { id } = useParams()
  const [eventName, setEventName] = useState()
  const [date, setDate] = useState({
      startDate: {},
      endDate: {}
  })
  const [country, setCountry] = useState()
  const [city, setCity] = useState()
  const [description, setDescription] = useState("")
  const [eventType, setEventType] = useState()
  const [selectedDanceStyles, setSelectedDanceStyles] = useState([])

  const handleDateChange = (newDate) => {
    setDate(newDate)
  }

  const handleOnSelect = (country) => {
    setCountry(country.name)
  }

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription)
  }

  const formatResult = (item) => {
    return (   
      <span style={{ display: 'block', textAlign: 'left' }}>{`${item.name}`}</span>
    )
  }

  const handlePublish = (e) => {
    e.preventDefault()

    const requestBody = {
      eventName, startDate: date.startDate, endDate: date.endDate, country: country, city, description, eventType, danceStyles:selectedDanceStyles
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("jwt")}`
      },
      body: JSON.stringify(requestBody),
    }

    fetch(`${ApiUrl.EDIT_EVENT}/${id}`, requestOptions)
  }

  useEffect(() => {
    const requestOptions = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
    }

    fetch(`${ApiUrl.EVENT_RESOURCE}/${id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        setCountry(data.country)
        setCity(data.city)
        setEventName(data.name)
        setDescription(data.description)
        setEventType(data.eventType)
        setSelectedDanceStyles(data.danceStyles)
        setDate({
            startDate: data.startingDate,
            endDate: data.endingDate
        })
    })
  }, [])

  return (
    <div className='w-screen h-full overflow-auto'>
      <TopBar />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mt-5 w-10/12">
        <form className='min-h-[80%] bg-white p-5 flex flex-col'>
          <div className='flex items-center justify-between'>
            <input value={eventName} onChange={(e) => setEventName(e.target.value)} className='text-4xl w-1/2 pl-5 mb-5 leading-5 border-b focus:outline-none' placeholder='Event name'/>

            <div className='w-1/3'>
              <Datepicker
                value={date}
                onChange={handleDateChange}
                useRange={false}
                inputClassName="outline-none border-none focus:ring-0"
              />
            </div>
          </div>

          <div className='flex items-center border-b border-t w-1/2'>

            <div className='w-1/2 '>
              <ReactSearchAutocomplete
                items={countries}
                placeholder={country}
                autoFocus
                maxResults={5}
                formatResult={formatResult}
                onSelect={handleOnSelect}
                styling={{
                  "zIndex": 1,
                  "border": "none",
                  "boxShadow": "none",
                  "borderRadius": "5px",
                  "fontSize": "1.25rem",
                  "fontFamily": "inherit",
                  "color": "inherit",
                  "placeholderColor": "default",
                }}/>
            </div>
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='City' className='text-xl border-l pl-5 w-1/2 focus:outline-none'/>

          </div>
          
          <DescriptionEditor value={description} setValue={handleDescriptionChange}/>

          <label>Select event type</label>
          <ItemsSelect items={eventTypes} label={eventType} setValue={setEventType}/>

          <label>Select dance style</label>
          <ItemsSelect items={danceStyles} isCheckboxSelected={true} isSearchEnabled={true} label="Select dance style" setValue={setSelectedDanceStyles} selectedItems={selectedDanceStyles}/>

          <div className='flex justify-between'>
              <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'
                      onClick={()=>{}}>
                Back
              </button>
            <div>
              <button class='mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'
                      onClick={handlePublish}>
                Save as draft
              </button>
              <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline'
                      onClick={()=>{}}>
                Save and publish
              </button>
            </div>
          </div>

        </form>
    
      </div>
    </div>
  )
}
