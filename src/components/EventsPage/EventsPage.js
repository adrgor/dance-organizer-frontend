import React from 'react'
import EventsList from './EventsList'
import TopBar from './TopBar'

export default function EventsPage() {
  return (
    <>
      <div className='bg-image'></div>
      <TopBar/>
      <EventsList/>
    </>
  )
}
