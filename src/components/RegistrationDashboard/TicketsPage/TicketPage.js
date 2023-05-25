import React from "react";
import TopBar from "../../GeneralUseComponents/TopBar";
import AddTicketForm from "./AddTicketForm";
import { useState } from "react";
import ApiUrl from "../../../utils/ApiUrl";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "../../GeneralUseComponents/LoadingSpinner";

export default function TicketPage() {
  const [tickets, setTickets] = useState([])
  const [eventName, setEventName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const eventId = searchParams.get("eventId") 

  const navigate = useNavigate()

  const handleAddTicket = () => {
    setTickets([...tickets, {}]);
  };

  const setTicket = (ticket, id) => {
    const ticketCopy = [...tickets];
    ticketCopy[id] = ticket;
    setTickets(ticketCopy);
  };

  const handleRemoveTicket = (id) => {
    const ticketsCopy = [...tickets];
    ticketsCopy.splice(id, 1);
    setTickets(ticketsCopy);
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    const requestBody = {
      tickets,
      eventId: parseInt(eventId)
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(ApiUrl.TICKET, requestOptions);
    navigate(`/registration-dashboard?eventId=${eventId}`)
  };

  useEffect(()=> {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    Promise.all([
      fetch(`${ApiUrl.TICKET}?eventId=${eventId}`, requestOptions)
      .then( (res) => res.json() ),
  
      fetch(`${ApiUrl.EVENT_RESOURCE}/${eventId}`, requestOptions)
      .then( (res) => res.json() )
    ]).then( ([ticketData, eventData]) => {
      setTickets(ticketData.tickets)
      setEventName(eventData.name)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="w-full h-full">
      <TopBar />
      <form className="w-[800px] bg-white m-auto rounded-sm mt-5 p-5">
        {isLoading ? 
          <LoadingSpinner/>
        :
            <>
              <div className="border rounded-sm shadow-sm">
                <p className="text-4xl text-center w-full p-5 mb-5 leading-5">
                  {eventName}
                </p>
                {tickets.length <= 0 && (
                  <p className="text-2xl p-5 text-center">No tickets added</p>
                )}
                {tickets.map((ticket, index) => {
                  return (
                    <AddTicketForm
                      ticket={ticket}
                      setTicket={(ticket) => setTicket(ticket, index)}
                      removeTicket={() => handleRemoveTicket(index)}
                    />
                  );
                })}

                <div
                  className='text-center text-sm text-gray-300 my-5 hover:cursor-pointer hover:text-black hover:before:bg-black hover:after:bg-black
                                      before:relative before:align-middle before:h-[0.5px] before:bg-gray-300 before:content-[""] before:inline-block before:w-2/5 before:right-3 before:ml-[-50%]
                                      after:relative after:align-middle after:h-[0.5px] after:bg-gray-300 after:content-[""] after:inline-block after:w-2/5 after:left-3 after:mr-[-50%]'
                  onClick={handleAddTicket}
                >
                  {" "}
                  Add +{" "}
                </div>
              </div>

              <div className="w-full flex justify-between">
                <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline">
                  Discard
                </button>
                <button
                  className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </>
        }
      </form>
    </div>
  );
}
