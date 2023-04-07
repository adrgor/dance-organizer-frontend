import React, { useEffect, useState } from 'react'
import danceStyles from '../../utils/DanceStyles'
import eventTypes from '../../utils/EventTypes'
import countries from '../../countries.json'
import ItemsSelect from '../FormComponents/ItemsSelect'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function FilterBar({handleNavigate, setIsFilterBarOpen}) {

    const [searchParams] = useSearchParams({
        countries: '',
        city: '',
        event_types: '',
        dance_styles: '',
        from_date: '',
        to_date: ''
    })

    const [selectedCountries, setSelectedCountries] = useState(searchParams.get('countries'))
    const [selectedCity, setSelectedCity] = useState(searchParams.get('city'))
    const [selectedEventTypes, setSelectedEventTypes] = useState(searchParams.get('event_types'))
    const [selectedDanceStyles, setSelectedDanceStyles] = useState(searchParams.get('dance_styles'))
    const [selectedFromDate, setSelectedFromDate] = useState(searchParams.get('from_date'))
    const [selectedToDate, setSelectedToDate] = useState(searchParams.get('to_date'))

    const countryNames = countries.map((country) => country.name)

    const handleSubmit = e => {
        e.preventDefault()
        setIsFilterBarOpen(false)
        handleNavigate({countries: selectedCountries,
                        city: selectedCity,
                        eventTypes: selectedEventTypes,
                        danceStyles: selectedDanceStyles,
                        fromDate: selectedFromDate,
                        toDate: selectedToDate
                    })
    }

    const handleReset = () => {
        setIsFilterBarOpen(false)
        setSelectedCity('')
        setSelectedCountries([])
        setSelectedEventTypes([])
        setSelectedDanceStyles([])
        setSelectedFromDate('')
        setSelectedToDate('')
        handleNavigate()
    }

  return (
    <form onSubmit={handleSubmit} className='border rounded-md mb-1 bg-stone-50 shadow-sm p-5 absolute top-16'>
        <div className='flex gap-1 w-fit flex-wrap'>
            <div className='w-[12rem]'>
                <label>Country</label>
                <ItemsSelect items={countryNames} isCheckboxSelected={true} isSearchEnabled={true} label="Select country" setValue={setSelectedCountries} selectedItems={selectedCountries} style={"absolute"}/>
            </div>
            <div className='w-[12rem]'>
                <label>City</label>
                <input placeholder='Select city' value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className='outline-none placeholder-black mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'/>
            </div>
            <div className='w-[12rem]'>
                <label>Event type</label>
                <ItemsSelect items={eventTypes} isCheckboxSelected={true} label="Select event type" setValue={setSelectedEventTypes} selectedItems={selectedEventTypes} style={"absolute"}/>
            </div>
            <div className='w-[12rem]'>
                <label>Dance styles</label>
                <ItemsSelect items={danceStyles} isCheckboxSelected={true} isSearchEnabled={true} label="Select dance styles" setValue={setSelectedDanceStyles} selectedItems={selectedDanceStyles} style={"absolute"}/>
            </div>
            <div className='w-[12rem]'>
                <label>From</label>
                <input type='date' value={selectedFromDate} onChange={e => setSelectedFromDate(e.target.value)} className='outline-none placeholder-black mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'/>
            </div>
            <div className='w-[12rem]'>
                <label>To</label>
                <input type='date' value={selectedToDate} onChange={e => setSelectedToDate(e.target.value)} className='outline-none placeholder-black mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5'/>
            </div>
        </div>
        <button onClick={handleReset} class="text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 mr-3" type="button">
            Reset
        </button>
        <button onClick={handleSubmit} class="text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
            Apply
        </button>
    </form>
  )
}
