import React, { useState } from 'react'
import { useEffect } from 'react'
import ApiUrl from '../../utils/ApiUrl';
import { useSearchParams } from 'react-router-dom';
import TopBar from '../EventsPage/TopBar';
import ParticipantDetails from './ParticipantDetails';
import { ACCEPTED, CANCELLED, DESCRIPTION, MULTIPLE_CHOICE, PAID, PARTIALLY_PAID, REGISTERED, TICKET, WAITING_LIST } from '../../utils/RegistrationFormInputs';
import useOutsideClick from '../../hooks/useOutsideClick';
import EmailFrom from './EmailForm';

export default function ParticipantPage() {

    const eventId = useSearchParams()[0].get("eventId")
    const [participants, setParticipants] = useState([])
    const [inputsForm, setInputsForm] = useState([])
    const [tickets, setTickets] = useState([])
    const [filter, setFilter] = useState({paymentOperation: 'gt'})
    const [isActionPressed, setActionPressed] = useState(false)
    const [selectedParticipants, setSelectedParticipants] = useState([])
    const [email, setEmail] = useState({
        title: "",
        body: ""
    })
    const [emailPopUpActive, setEmailPopUpActive] = useState(false)

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

    const handleFilter = () => {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        }

        let requestParams = `?eventId=${eventId}`
        for (const [key, value] of Object.entries(filter)) {
          requestParams += `&${key}=${value}`
        } 
        
        fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}${requestParams}`, requestOptions)
        .then(response => response.json())
        .then(data => setParticipants(data))
    }
    
    const resetFilter = () => {
        window.location.reload()
    }

    const handleCheckEverybody = (e) => {
        const participantIds = participants.map(participant => (participant.participantId))
        if(e.target.checked) {
            setSelectedParticipants(participantIds)
        } else if (JSON.stringify(selectedParticipants) == JSON.stringify(participantIds)) {
            setSelectedParticipants([])
        }
    }

    const handleChecked = (participantId) => {
        const selectedParticipantsCopy = [...selectedParticipants]
        if(selectedParticipants.includes(participantId)) {
            const index = selectedParticipantsCopy.indexOf(participantId);
            if(index > -1) {
                selectedParticipantsCopy.splice(index, 1)
            }
        } else {
            selectedParticipantsCopy.push(participantId)
        }
        
        setSelectedParticipants(selectedParticipantsCopy)
    }

    const handleRemoveSelected = () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify([...selectedParticipants])
        };

        fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}?eventId=${eventId}`, requestOptions)
        window.location.reload()
    }

    const handleEmailSend = (title, body) => {
        const requestOptions = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                participantIds: selectedParticipants,
                title,
                body
            })
        };

        fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}/email?eventId=${eventId}`, requestOptions)
    }

    return (
        <div className='w-full h-full'>
            <TopBar/>
            <EmailFrom isActive={emailPopUpActive} setActive={setEmailPopUpActive} sendEmail={handleEmailSend} setEmail={setEmail}/>
            <div className='m-auto mt-5 bg-white'>
                <table class="block m-auto text-sm text-center text-gray-500 overflow-x-scroll">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-r">
                        {/* HEADER */}
                        <tr>
                            <th className='p-5 relative'
                                ref={useOutsideClick(()=>setActionPressed(false))}>
                                <div className='p-2 w-fit bg-blue-500 rounded-md text-white font-bold hover:bg-blue-700 hover:cursor-pointer'
                                     onClick={() => setActionPressed(!isActionPressed)}>
                                    Action
                                </div>
                                <div className={`${isActionPressed ? 'absolute' : 'hidden'} bg-white border p-2 top-16 w-56`}>
                                    <div className='border-b p-1 text-lg hover:bg-gray-100 hover:cursor-pointer' onClick={() => setEmailPopUpActive(true)}>Send email</div>
                                    <div className='border-b p-1 text-lg hover:bg-gray-100 hover:cursor-pointer' onClick={handleRemoveSelected}>Remove selected</div>
                                </div>
                            </th>
                            <th className='p-5'>
                                ID
                            </th>
                            <th className='p-5'>
                                Partner ID
                            </th>
                            {inputsForm.map(input => {
                                if(input.type === DESCRIPTION) return
                                if(input.type === TICKET) {
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
                                }
                                    
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

                        {/* FILTER */}
                        <tr>
                            <td className='p-5'>
                                <input type='checkbox' onChange={handleCheckEverybody}/>
                            </td>
                            <td className='px-6 pb-3'>
                                <input className='p-1 text-lg' placeholder='ID' 
                                       value={filter.participantId} onChange={(e) => setFilter(prev => ({...prev, participantId: e.target.value}))}/>
                            </td>
                            <td className='px-6 pb-3'>
                                <input className='p-1 text-lg' placeholder='Partner ID'
                                       value={filter.partnerId} onChange={(e) => setFilter(prev => ({...prev, partnerId: e.target.value}))}/>
                                </td>

                            {inputsForm.map(input => {
                                if(input.type === DESCRIPTION) return
                                if(input.type === TICKET) {
                                    return (
                                        <>
                                            <td scope="col" className="px-6 pb-3">
                                                <select className='p-1 text-lg text-gray-400' 
                                                        value={filter[input.question]} onChange={(e) => setFilter(prev => ({...prev, [input.question]: e.target.value}))}>
                                                    <option selected disabled>Ticket type</option>
                                                    {tickets.map(ticket => (
                                                        <option>{ticket.name}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td scope="col" className="px-6 pb-3">
                                                <select className='p-1 text-lg text-gray-400'
                                                        value={filter["Role"]} onChange={(e) => setFilter(prev => ({...prev, ["Role"]: e.target.value}))}>
                                                    <option selected disabled>Role</option>
                                                    <option className='text-black'>Leader</option>
                                                    <option className='text-black'>Follower</option>
                                                </select>
                                            </td>
                                        </>
                                    )
                                }

                                if(input.type === MULTIPLE_CHOICE) {
                                    return (
                                        <select className='p-1 text-lg text-gray-400'
                                                value={filter[input.question]} onChange={(e) => setFilter(prev => ({...prev, [input.question]: e.target.value}))}>
                                            <option selected disabled>{input.question}</option>
                                            {input.options.map(option => (
                                                <option>{option}</option>
                                            )
                                            )}
                                        </select>
                                    )
                                }
                                return (
                                    <td scope="col" className="px-6 pb-3">
                                        <input className='p-1 text-lg' placeholder={input.question}
                                               value={filter[input.question]} onChange={(e) => setFilter(prev => ({...prev, [input.question]: e.target.value}))}/>
                                    </td>
                                )
                            })}
                            <td className='px-6 pb-3'>
                                <select className='p-1 text-lg text-gray-400'
                                        value={filter.status} onChange={(e) => setFilter(prev => ({...prev, status: e.target.value}))}>
                                    <option selected disabled>Status</option>
                                    <option>{REGISTERED}</option>
                                    <option>{WAITING_LIST}</option>
                                    <option>{ACCEPTED}</option>
                                    <option>{PARTIALLY_PAID}</option>
                                    <option>{PAID}</option>
                                    <option>{CANCELLED}</option>
                                </select>
                            </td>
                            <td className='px-6 pb-3 flex'>
                                <select className='appearance-none px-3 font-bold text-xl'
                                        value={filter.paymentOperation} onChange={(e) => setFilter(prev => ({...prev, paymentOperation: e.target.value}))}>
                                    <option value="gt">&gt;</option>
                                    <option value="ge">&ge;</option>
                                    <option value="eq">&#61;</option>
                                    <option value="le">&le;</option>
                                    <option value="lt">&lt;</option>
                                </select>
                                <input className='p-1 text-lg w-32' placeholder='Amount paid'
                                       value={filter.amountPaid} onChange={(e) => setFilter(prev => ({...prev, amountPaid: e.target.value}))}/>
                            </td>
                            <td className='px-6 pb-3'>
                                <div className='text-lg font-bold text-white p-1 bg-blue-500 rounded-md hover:bg-blue-700 hover:cursor-pointer'
                                    onClick={handleFilter}>
                                    Filter
                                </div>
                            </td>
                            <td className='px-6 pb-3'>
                                <div className='text-lg font-bold text-white p-1 bg-blue-500 rounded-md hover:bg-blue-700 hover:cursor-pointer'
                                    onClick={resetFilter}>
                                    Reset
                                </div>
                            </td>
                        </tr>


                    </thead>

                    <tbody>
                        {participants.map((participant) => {
                            return <ParticipantDetails participant={participant} formPattern={inputsForm} tickets={tickets} isChecked={() => selectedParticipants.includes(participant.participantId)} handleChecked={handleChecked}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
