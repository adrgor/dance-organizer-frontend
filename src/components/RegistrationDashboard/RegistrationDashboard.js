import React, { useEffect } from "react";
import TopBar from "../GeneralUseComponents/TopBar";
import TicketTypes from "./TicketTypes";
import RegistrationsPreview from "./RegistrationsPreview";
import RegistrationFormPreview from "./RegistrationFormPreview";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../GeneralUseComponents/LoadingSpinner";
import ApiUrl from "../../utils/ApiUrl";

export default function RegistrationDashboard() {
  const eventId = useSearchParams()[0].get("eventId")
  
  const [isLoading, setIsLoading] = useState(true)
  const [eventName, setEventName] = useState('')
  const [participants, setParticipants] = useState() 
  const [tickets, setTickets] = useState()
  const [inputForms, setInputForms] = useState()

  useEffect(() => {
    const requestOptions = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        }
    };
  
    Promise.all([
        fetch(`${ApiUrl.EVENT_RESOURCE}/${eventId}`, requestOptions)
        .then( (res) => res.json() ),

        fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}?eventId=${eventId}`, requestOptions)
        .then( (res) => res.json() ),
    
        fetch(`${ApiUrl.FORM}?eventId=${eventId}`, requestOptions)
        .then( (res) => res.json())
        .catch((error) => ({inputs: []})),

        fetch(`${ApiUrl.TICKET}?eventId=${eventId}`, requestOptions)
        .then( (res) => res.json())
        .catch((error) => ({tickets: []})),
    
      ]).then( ([eventData, participantsData, formInputData, ticketData]) => {
        setEventName(eventData.name)
        setParticipants(participantsData)
        setInputForms(formInputData)
        setTickets(ticketData.tickets)
        setIsLoading(false)
      })
},[])

  return (
    <div className="w-screen h-screen">
      <TopBar />
      <div className="w-10/12 m-auto mt-5 p-5 rounded-sm bg-white">
        {isLoading ? 
          <LoadingSpinner />
        :
          <>
            <p className="text-5xl font-bold m-auto shadow-sm w-fit">
              {eventName}
            </p>
            <RegistrationsPreview participants={participants} eventId={eventId}/>
            <TicketTypes tickets={tickets} eventId={eventId}/>
            <RegistrationFormPreview registerFormInputs={inputForms} eventId={eventId}/>
          </>
        }
      </div>
    </div>
  );
}
