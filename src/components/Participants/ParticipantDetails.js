import React, { useState } from 'react'
import { ACCEPTED, CANCELLED, DESCRIPTION, MULTIPLE_CHOICE, PAID, PARTIALLY_PAID, REGISTERED, TICKET, WAITING_LIST } from '../../utils/RegistrationFormInputs'
import { useSearchParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'
import { useEffect } from 'react'

export default function ParticipantDetails({ participant, formPattern, tickets, isChecked, handleChecked }) {

    const eventId = useSearchParams()[0].get("eventId")
    const [participantState, setParticipantState] = useState(participant.formInputs)
    const [status, setStatus] = useState(participant.status)
    const [amountPaid, setAmountPaid] = useState(participant.amountPaid)
    const [isCheckedState, setCheckedState] = useState(false)

    useEffect(() => {
        setParticipantState(participant.formInputs)
        setStatus(participant.status)
        setAmountPaid(participant.amountPaid)
        setCheckedState(isChecked)
    }, [participant, isChecked])

    const [isDisabled, setDiabled] = useState(true)

    const handleMultipleChoiceChange = (fieldName, valueClicked) => {
        if(participantState[fieldName].includes(valueClicked)) {
            const valuesCopy = participantState[fieldName]
            const valueIndex = valuesCopy.indexOf(valueClicked)
            valuesCopy.splice(valueIndex, 1)
            setParticipantState(prev => ({...prev, [fieldName]: valuesCopy}))
        } else {
            const valuesCopy = [...participantState[fieldName], valueClicked]
            setParticipantState(prev => ({...prev, [fieldName]: valuesCopy}))
        }
    }

    const handleSave = () => {
        if(!isDisabled) {
            const participantStateCopy = {...participantState}
            const requestBody = {
                eventId: parseInt(eventId),
                participantId: participant.participantId,
                partnerId: participant.partnerId,
                participantData: participantState,
                amountPaid,
                status
            }

            const requestOptions = {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                body: JSON.stringify(requestBody)
            };
            fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}?eventId=${eventId}`, requestOptions)
        }
        setDiabled(!isDisabled)
    }

    const handleRemove = () => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify([participant.participantId])
        };

        fetch(`${ApiUrl.PARTICIPANT_REGISTRATIONS}?eventId=${eventId}`, requestOptions)
        window.location.reload()
    }

  return (
    <tr>
        <td className='p-5'>
            <input type='checkbox' checked={isCheckedState} onChange={() => handleChecked(participant.participantId)}/>
        </td>
        <td className='p-5'>{participant.participantId}</td>
        <td className='p-5'>{participant.partnerId ? participant.partnerId : "No partner"}</td>

        {formPattern.map(input => {
            if(input.type === DESCRIPTION) return
            if(input.type === TICKET){
                return (
                    <>
                        <td>
                            <select onChange={e => setParticipantState(prevState => ({...prevState, [input.question]: [e.target.value]}))}
                                    disabled={isDisabled}>
                                {tickets.map(ticket => {
                                    return <option selected={participant.formInputs[input.question][0] === ticket.name}>{ticket.name}</option>
                                })}
                            </select>
                        </td>
                        <td>
                            <select onChange={e => setParticipantState(prevState => ({...prevState, "Role": [e.target.value]}))}
                                    className='text-center' disabled={isDisabled}>
                                <option selected={participantState["Role"] == 'Leader'}>Leader</option>
                                <option selected={participantState["Role"] == 'Follower'}>Follower</option>
                            </select>    
                        </td>
                    </>
                )
            }
            if(input.type === MULTIPLE_CHOICE) {
                return (
                    <td className='py-5 pl-1'>
                        {input.options.map(option => {
                            return <div className='text-left ml-6 w-fit'>
                                <input id={`${participant.participantId}-${input.question}-${option} input.question`} type='checkbox' 
                                        checked={participantState[input.question].includes(option)}
                                        onChange={() => handleMultipleChoiceChange(input.question, option)}
                                        disabled={isDisabled}
                                        className='w-fit'/>
                                <label for={`${participant.participantId}-${input.question}-${option} input.question`}
                                       className='ml-1'>{option}</label>
                            </div>
                        })}
                    </td>
                )
            }

            return <td>{
                participant.formInputs[input.question].map(answer => {
                    return <input value={participantState[input.question]} onChange={e => setParticipantState(prevState => ({...prevState, [input.question]: [e.target.value]}))} 
                                  className='text-center' disabled={isDisabled}/>
                })
            }</td>
        })}

        <td className='p-5'>
            <select className='text-center' disabled={isDisabled}
                    onChange={(e) => setStatus(e.target.value)}>
                <option selected={status === REGISTERED}>{REGISTERED}</option>
                <option selected={status === WAITING_LIST}>{WAITING_LIST}</option>
                <option selected={status === ACCEPTED}>{ACCEPTED}</option>
                <option selected={status === PARTIALLY_PAID}>{PARTIALLY_PAID}</option>
                <option selected={status === PAID}>{PAID}</option>
                <option selected={status === CANCELLED}>{CANCELLED}</option>
            </select>
        </td>
        <td className='p-5'>
            <input value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} type='number' className='text-center' disabled={isDisabled}/>
        </td>
        <td className='p-5 border-x w-20' onClick={handleSave}>{isDisabled ? "EDIT" : "SAVE"}</td>
        <td className='p-5 border-r' onClick={handleRemove}>REMOVE</td>
    </tr>
  )
}
