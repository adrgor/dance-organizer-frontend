import React from 'react'
import Event from './Event'

export default function EventsList() {
  return (
    <div className='events-list'>
        <table>
          <tr className='column-names'>
            <th>Date</th>
            <th>Name</th>
            <th>Dance</th>
            <th>Country, City</th>
            <th>Filter</th>
          </tr>
          <Event date='16.11.2022 - 20.11.2022'
                 name='Dragon Swing Festival'
                 dance='Lindy Hop'
                 place='Poland, Cracow'/>
          <Event date='10,11,2022 - 14,11,2022'
                 name='el Sol Festival'
                 dance='Salsa'
                 place='Poland, Cracow'/>
        </table>
    </div>
  )
}
