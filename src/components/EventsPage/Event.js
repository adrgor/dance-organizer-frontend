import React from 'react'

const handleFestivalClick = (e) => {
    e.stopPropagation()
}

const handleAddToFavoritesClick = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

export default function Event({ date, name, dance, place }) {
  

  return (
    <a href="event-details" style={{color: "black"}}>
      <tr className="event" onClick={handleFestivalClick}>
          <th>{date}</th>
          <th>{name}</th>
          <th>{dance}</th>
          <th>{place}</th>
          <th onClick={handleAddToFavoritesClick}>Add to favourites</th>
      </tr>
    </a>
  )
}
