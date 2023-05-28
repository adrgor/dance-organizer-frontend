import React from 'react'
import ParticipantInput from './ParticipantInput'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'
import { DESCRIPTION, MULTIPLE_CHOICE, TICKET } from '../../utils/RegistrationFormInputs'
import LoadingSpinner from '../GeneralUseComponents/LoadingSpinner'

export default function ParticipantRegistrationForm() {
  const eventId = useSearchParams()[0].get("eventId")
  const navigate = useNavigate()

  const [isPartnerRegistration, setPartnerRegistration] = useState(false)
  const [eventName, setEventName] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [registrationForm, setRegistrationForm] = useState({
    inputs: [],
    tickets: [],
    isOpen: false
  })
  const [formInput, setFormInput] = useState({
    participant: [],
    partner: []
  })

  const handleParticipantInputChange = (index, value) => {
    if(!(Array.isArray(formInput.participant[index].value))) {
      const inputCopy = {...formInput}
      const participantInputCopy = [...formInput.participant]
      participantInputCopy[index].value = value
      inputCopy.participant = participantInputCopy
      setFormInput(inputCopy)
    } else {
      const inputCopy = {...formInput}
      const participantInputCopy = [...formInput.participant]
      let arr = participantInputCopy[index].value
      if(arr.includes(value)) {
        const indexToRemove = arr.indexOf(value)
        arr.splice(indexToRemove, 1)
      } else {
        arr = [...arr, value]
        participantInputCopy[index].value = arr
      }
      inputCopy.participant = participantInputCopy
      setFormInput(inputCopy)
    }
  }

  const handleTicketRoleChange = (index, role) => {
    const formInputCopy = {...formInput}
    formInputCopy.participant[index].role = role
    setFormInput(formInputCopy)
  }

  const handlePartnerInputChange = (index, value) => {
    if(!(Array.isArray(formInput.partner[index].value))) {
      const inputCopy = {...formInput}
      const partnerInputCopy = [...formInput.partner]
      partnerInputCopy[index].value = value
      inputCopy.partner = partnerInputCopy
      setFormInput(inputCopy)
    } else {
      const inputCopy = {...formInput}
      const partnerInputCopy = [...formInput.partner]
      let arr = partnerInputCopy[index].value
      if(arr.includes(value)) {
        const indexToRemove = arr.indexOf(value)
        arr.splice(indexToRemove, 1)
      } else {
        arr = [...arr, value]
        partnerInputCopy[index].value = arr
      }
      inputCopy.partner = partnerInputCopy
      setFormInput(inputCopy)
    }
  }

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
      fetch(`${ApiUrl.FORM}?eventId=${eventId}`, requestOptions)
      .then( (res) => res.json() ),
  
      fetch(`${ApiUrl.TICKET}?eventId=${eventId}`, requestOptions)
      .then( (res) => res.json() ),

      fetch(`${ApiUrl.EVENT_RESOURCE}/${eventId}`, requestOptions)
      .then( (res) => res.json() ),
    ])
    .then( ([formData, ticketData, eventData]) => {
      setRegistrationForm(prevState => ({
        ...prevState,
        inputs: formData.inputs,
        tickets: ticketData.tickets,
        isOpen: formData.isOpen
      }))

      setFormInput({
        participant: formData.inputs.map(input => {
          if(input.type === TICKET)
            return {question: input.question, type:input.type, value: "", role: ""}
          else if(input.type === MULTIPLE_CHOICE)
            return {question: input.question, type:input.type, value: []}
          else
            return {question: input.question, type:input.type, value: ""}
        }),
        partner: formData.inputs.map(input => {
          if(input.type === TICKET)
            return {question: input.question, type:input.type, value: "", role: ""}
          else if(input.type === MULTIPLE_CHOICE)
            return {question: input.question, type:input.type, value: []}
          else
            return {question: input.question, type:input.type, value: ""}
        })
      })

      setEventName(eventData.name)
      setIsLoading(false)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let partnerTicketType, partnerRole;

    const formInputCopy = {...formInput}
    formInputCopy.participant = formInputCopy.participant.filter(element => {
      return element.type !== DESCRIPTION
    })
    formInputCopy.participant = formInputCopy.participant.flatMap(element => {
        if(element.type === DESCRIPTION) return
        if(!(element.value instanceof Array)){
          element.value = new Array(element.value)
        }
        if(element.type === TICKET) {
          partnerTicketType = element.value
          if(element.role === "Leader") 
            partnerRole = "Follower"
          else 
            partnerRole = "Leader"
          
          return [element, {"question": "Role", "value": new Array(element.role)}]
        }
        return element
      })

    formInputCopy.partner.filter(element => {
      return element.type !== DESCRIPTION
    })
    formInputCopy.partner = formInputCopy.partner.flatMap(element => {
      if(element.type === DESCRIPTION) return
      if(!(element.value instanceof Array))
        element.value = new Array(element.value)
      if(element.type === TICKET) {
        element.value = partnerTicketType
        element.role = partnerRole
        return [element, {"question": "Role", "value": new Array(element.role)}]
      }
      return element
    })    

    const requestBody = {
      eventId: parseInt(eventId),
      participant: formInputCopy.participant,
      partner: isPartnerRegistration ? formInputCopy.partner : []
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };
    fetch(ApiUrl.PARTICIPANT_REGISTRATIONS, requestOptions);
    navigate("/registration-confirmed")
  } 

  
  return (
    <div className='h-screen w-[800px] bg-white'>
      {isLoading ? 
          <div className='p-5'>
          <LoadingSpinner/>
         </div>
        :
          <form className='w-full bg-white' onSubmit={handleSubmit}>
            <div className='text-center text-4xl font-bold m-5'>{eventName}</div>
            <div className='border pb-5'>
              {registrationForm.inputs.map((input, index) => {
                return (
                    <ParticipantInput key={index} index={index} type={input.type}
                                question={input.question} options={input.options}
                                isRequired={input.isRequired} description={input.description}
                                tickets={registrationForm.tickets}
                                inputs={formInput.participant} setInput={handleParticipantInputChange} setRole={handleTicketRoleChange}/>
                )
              })}
            </div>
            { !isPartnerRegistration ? 
              <div className='text-center text-4xl text-gray-500 mt-5 hover:cursor-pointer hover:text-black '
                  onClick={()=>setPartnerRegistration(true)}>Register with partner</div>
              :
              <>
                <div className='text-center text-4xl font-bold m-5'>Partner registration</div>
                {registrationForm.inputs.map((input, index) => {
                  return (
                      <ParticipantInput key={index} index={index} type={input.type}
                                  question={input.question} options={input.options}
                                  isRequired={input.isRequired} description={input.description}
                                  tickets={registrationForm.tickets}
                                  isPartner inputs={formInput.partner} setInput={handlePartnerInputChange}/>
                  )
                })}
              </>
            }
            
            <div className='text-right border-t mt-5'>
              {registrationForm.isOpen ? 
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-5 py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline justify-self-end"
                  onClick={handleSubmit}>
                  Submit registration 
                </button>
                :
                <div className="inline-block bg-gray-400 text-white font-bold m-5 py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline justify-self-end">
                  Submit registration 
                </div>
              }
              
            </div>
          </form>}
    </div>
  )
}
