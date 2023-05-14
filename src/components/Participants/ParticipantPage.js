import React, { useState } from 'react'
import { useEffect } from 'react'
import ApiUrl from '../../utils/ApiUrl';
import { useSearchParams } from 'react-router-dom';
import TopBar from '../EventsPage/TopBar';
import ParticipantDetails from './ParticipantDetails';
import { DESCRIPTION, TICKET } from '../../utils/RegistrationFormInputs';

export default function ParticipantPage() {

    const eventId = useSearchParams()[0].get("eventId")
    const [participants, setParticipants] = useState([])
    const [inputsForm, setInputsForm] = useState([])
    const [tickets, setTickets] = useState([])

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
            fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}?eventId=${eventId}`, requestOptions)
            .then( (res) => res.json() ),
        
            fetch(`${ApiUrl.FORM}?eventId=${eventId}`, requestOptions)
            .then( (res) => res.json() ),

            fetch(`${ApiUrl.TICKET}?eventId=${eventId}`, requestOptions)
            .then( (res) => res.json() ),
        
          ]).then( ([participantsData, formInputData, ticketData]) => {
            setParticipants(participantsData)
            setInputsForm(formInputData.inputs)
            setTickets(ticketData.tickets)
          })
    },[])

    return (
        <div className='w-full h-full'>
            <TopBar/>
            <div className='m-auto mt-5 bg-white'>
                <table class="block m-auto text-sm text-center text-gray-500 overflow-x-scroll">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-r">
                        <tr>
                            <th className='p-5'>
                                <input type='checkbox'/>
                            </th>
                            <th className='p-5'>
                                ID
                            </th>
                            <th className='p-5'>
                                Partner ID
                            </th>
                            {inputsForm.map(input => {
                                if(input.type === DESCRIPTION) return
                                if(input.type === TICKET)
                                    return (
                                        <>
                                            <th scope="col" class="px-6 py-3">
                                                {input.question}
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Role
                                            </th>
                                        </>
                                    )
                                return (
                                    <th scope="col" class="px-6 py-3">
                                        {input.question}
                                    </th>
                                )
                            })}
                            <th className='p-5'>STATUS</th>
                            <th className='p-5'>AMOUNT PAID</th>
                            <th className='p-5' colSpan={2}>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {participants.map((participant) => {
                            return <ParticipantDetails participant={participant} formPattern={inputsForm} tickets={tickets}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
