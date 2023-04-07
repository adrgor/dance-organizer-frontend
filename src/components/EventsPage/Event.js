import React from 'react'

export default function Event({eventDetails}) {
  const startingDate = new Date(eventDetails.startingDate)
  const endingDate = new Date(eventDetails.endingDate)
  const [startYear, startMonth, startDate] = [startingDate.getFullYear(), startingDate.getMonth(), startingDate.getDate()]
  const [endYear, endMonth, endDate] = [endingDate.getFullYear(), endingDate.getMonth(), endingDate.getDate()]

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td class="px-6 py-4">      
          <div class="text-base font-semibold text-black">{eventDetails.name}</div>
      </td>

      <td class="px-6 py-4">
        <div>
            <div class="text-base font-semibold">{eventDetails.country}</div>
            <div class="font-normal text-gray-500">{eventDetails.city}</div>
        </div>  
      </td>

      <td class="px-6 py-4">
          <p>{`From ${startYear}/${startMonth}/${startDate}`}</p>
          <p>{`To ${endYear}/${endMonth}/${endDate}`}</p>
      </td>

      <td class="px-6 py-4 overflow-hidden">
          {eventDetails.danceStyles.map((danceStyle) => {
            return <p>{danceStyle}</p>
          })}
      </td>
      <td class="px-6 py-4">
          <a href={`event-details/${eventDetails.eventId}`} type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">View details</a>
      </td>
    </tr>
  )
}
