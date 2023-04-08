import React from 'react'
import EventsList from './EventsList'
import TopBar from './TopBar'

export default function EventsPage({isMyList}) {
  return (
    <div className='w-screen h-screen'>
      <TopBar/>
      <EventsList isMyList={isMyList}/>
    </div>
  )
}
