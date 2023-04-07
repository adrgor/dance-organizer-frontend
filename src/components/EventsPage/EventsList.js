import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'
import Event from './Event'
import FilterBar from '../EventDetails/FilterBar'
import useOutsideClick from '../../hooks/useOutsideClick'

export default function EventsList() {

    const navigate = useNavigate()
    const handleNavigate = ({
        eventsPerPage = 10,
        pageNumber = 1,
        eventName = '',
        countries = '',
        city = '',
        eventTypes = '',
        danceStyles = '',
        fromDate = '',
        toDate = ''
    } = {}) => {
        navigate(`/events?events_per_page=${eventsPerPage}&page_number=${pageNumber}&event_name=${eventName}&` +
                 `countries=${countries}&city=${city}&event_types=${eventTypes}&dance_styles=${danceStyles}&` + 
                 `from_date=${fromDate}&to_date=${toDate}`)
    }

    const [events, setEvents] = useState([]);
    const [searchBarName, setSearchBarName] = useState('')
    const [lastPage, setLastPage] = useState(1);
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);

    const [searchParams] = useSearchParams({
        events_per_page: 10,
        page_number: 1,
        event_name: '',
        countries: '',
        city: '',
        event_types: '',
        dance_styles: '',
        from_date: '',
        to_date: ''
    })

    const eventsPerPage = searchParams.get('events_per_page')
    const pageNumber = searchParams.get('page_number')
    const eventName = searchParams.get('event_name')
    const countries = searchParams.get('countries')
    const city = searchParams.get('city')
    const eventTypes = searchParams.get('event_types')
    const danceStyles = searchParams.get('dance_styles')
    const fromDate = searchParams.get('from_date')
    const toDate = searchParams.get('to_date')

    const handleOnSearchSubmit = e => {
        e.preventDefault()
        navigate(`/events?events_per_page=${eventsPerPage}&page_number=1&event_name=${searchBarName}`)  
    }

    useEffect(() => {
    async function fetchData() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
        };

        const url = ApiUrl.EVENT_RESOURCE + `?events_per_page=${eventsPerPage}`
                    + `&page_number=${pageNumber}`
                    + `&event_name=${eventName}`
                    + `&countries=${countries}`
                    + `&city=${city}`
                    + `&event_types=${eventTypes}`
                    + `&dance_styles=${danceStyles}`
                    + `&from_date=${fromDate}`
                    + `&to_date=${toDate}`

        console.log(url)

        const [eventsResponse, lastPageResponse] = await Promise.all([
            fetch(url, requestOptions),
            fetch(`${ApiUrl.EVENT_LAST_PAGE}?events_per_page=${eventsPerPage}`, requestOptions),
        ]);

        const [eventsData, lastPageData] = await Promise.all([
            eventsResponse.json(),
            lastPageResponse.json(),
        ]);

        setEvents(eventsData);
        setLastPage(lastPageData);
    }

    fetchData();
    }, [eventsPerPage, pageNumber, eventName, searchParams]);


  return (
    
    <div class="relative overflow-x-visible shadow-md sm:rounded-lg m-auto mt-5 w-10/12">
        <div ref={useOutsideClick(()=>setIsFilterBarOpen(false))} class="flex items-center justify-between py-4 bg-white p-5 rounded-t-md">
            <div class='relative'>
                <button onClick={() => setIsFilterBarOpen(!isFilterBarOpen)} class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    Filter
                    <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <form onSubmit={handleOnSearchSubmit} >
                    <input type="text" value={searchBarName} onChange={e => setSearchBarName(e.target.value)} class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name"/>
                </form>
            </div>
            {isFilterBarOpen && <FilterBar handleNavigate={handleNavigate} setIsFilterBarOpen={setIsFilterBarOpen}/>}
        </div>

        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Where
                    </th>
                    <th scope="col" class="px-6 py-3">
                        When
                    </th>
                    <th scope="col" class="px-6 py-3">
                        What
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>

            <tbody>
                {events.map((event) => {
                    return <Event eventDetails={event}/>
                })}
            </tbody>
        </table>

        <div className='flex justify-between bg-white mt-1 p-1 pl-5 pr-5 rounded-b-md'>
            <div className='text-lg'>
                <a onClick={() => handleNavigate({
                    eventsPerPage: 10, 
                    pageNumber: 1,
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className={`m-1 text-blue-500 font-bold hover:cursor-pointer ${eventsPerPage == 10 ? "underline text-xl" : ""}`}>
                    10
                </a>
                <a onClick={() => handleNavigate({
                    eventsPerPage: 25, 
                    pageNumber: 1,
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className={`m-1 text-blue-500 font-bold hover:cursor-pointer ${eventsPerPage == 25 ? "underline text-xl" : ""}`}>
                    25
                </a>
                <a onClick={() => handleNavigate({
                    eventsPerPage: 50, 
                    pageNumber: 1,
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className={`m-1 text-blue-500 font-bold hover:cursor-pointer ${eventsPerPage == 50 ? "underline text-xl" : ""}`}>
                    50
                </a>
            </div>
            
            <div className='text-lg'>
                <a onClick={() => handleNavigate({
                    eventsPerPage, 
                    pageNumber: 1,
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className='m-1 text-blue-500 font-bold hover:cursor-pointer'>First</a>

                <a onClick={() => handleNavigate({
                    eventsPerPage,
                    pageNumber: Math.max(parseInt(pageNumber)-1, 1),
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className='m-1 text-blue-500 font-bold hover:cursor-pointer'>Prev</a>

                <p className='inline m-1 text-xl underline text-blue-500 font-bold'>{pageNumber}</p>

                <a onClick={() => handleNavigate({
                    eventsPerPage,
                    pageNumber: Math.min(parseInt(pageNumber) + 1, parseInt(lastPage) + 1),
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className='m-1 text-blue-500 font-bold hover:cursor-pointer'>Next</a>
    
                <a onClick={() => handleNavigate({
                    eventsPerPage,
                    pageNumber: parseInt(lastPage) + 1,
                    eventName, countries, city, eventTypes, danceStyles, fromDate, toDate
                })} className='m-1 text-blue-500 font-bold hover:cursor-pointer'>Last</a>
            </div>
        </div>
    </div>
  )
}