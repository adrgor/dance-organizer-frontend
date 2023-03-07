import React from 'react'

export default function InfoBox() {
  return (
    <div className="info-box">
    <p>Dancify is an always free app that makes it easy to:</p>
    
    <ul>
        <li>Create dance events in your area</li>
        <li>Create registration form</li>
        <li>Manage registrations</li>
        <li>Send personalized emails to the paricipants</li>
        <li>Browse dance events in your area</li>
        <li>And much more!</li>
    </ul>

    <p>Start using dencify now, log in, create a new account, or <a href="/events" style={{color: "#638FFF"}}>BROWSE AS A GUEST</a></p>
</div>
  )
}
