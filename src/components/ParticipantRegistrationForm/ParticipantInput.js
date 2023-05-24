import React from 'react'
import RegistrationFormInputs, {INPUT_FIELD, EMAIL} from '../../utils/RegistrationFormInputs'
import { TICKET } from '../../utils/RegistrationFormInputs'
import { SINGLE_CHOICE } from '../../utils/RegistrationFormInputs'
import { MULTIPLE_CHOICE } from '../../utils/RegistrationFormInputs'
import { DROP_DOWN } from '../../utils/RegistrationFormInputs'
import { DESCRIPTION } from '../../utils/RegistrationFormInputs'
import DescriptionEditor from '../EventDetails/DesriptionEditor'

export default function ParticipantInput({ index, type, question, options, description, tickets, isPartner, inputs, setInput, setRole }) {
  return (
    <div className={`flex justify-around items-center mt-5`}>
      {type !== DESCRIPTION && <p className='text-xl w-1/3'>{question}</p>}
      {(() => {
        if (type == INPUT_FIELD)
          return <input className='w-[50%] text-lg px-2 py-2 bg-gray-100 border-b focus:outline-none focus:border-b-black'
                        value={inputs[index].value} 
                        onChange={e => setInput(index, e.target.value)}/>

        else if (type == EMAIL)
          return <input className='w-[50%] text-lg px-2 py-2 bg-gray-100 border-b focus:outline-none focus:border-b-black'
                        value={inputs[index].value} 
                        onChange={e => setInput(index, e.target.value)}/>

        else if (type == TICKET && !isPartner)
          return ( 
              <div className='w-[50%]'>
                <select className='w-full flex flex-col text-lg px-2 py-2 border-b focus:outline-none focus:border-b-black'
                        value={inputs[index].value} 
                        onChange={e => setInput(index, e.target.value)}>
                  <option disabled selected></option>
                  {
                    tickets.map((ticket, index) => {
                      return (
                        <option>
                          {ticket.name}
                        </option>
                      )
                    })
                  }
              </select>
              <fieldset className='flex text-lg px-2 py-2  focus:outline-none focus:border-b-black'>
                <div>
                  <input type='radio' name='ticketRole' id='ticket-leader'
                         checked={inputs[index].role === "Leader"}
                         onChange={() => setRole(index, "Leader")}/>
                  <label className='p-2' for='ticket-leader'>Leader</label>
                </div>
                <div className='ml-5'>
                  <input type='radio' name='ticketRole' id='ticket-follower'
                         checked={inputs[index].role === "Follower"}
                         onChange={() => setRole(index, "Follower")}/>
                  <label className='p-2' for='ticket-follower'>Follower</label>
                </div>
              </fieldset>
            </div>
          )
        else if (type == TICKET && isPartner)
          return (
            <div className='w-[50%] text-xl'>
                <div>When you register with a partner, your partner will be assigned to the same ticket type as you with the opposite role</div>
            </div>
          )
        else if (type == SINGLE_CHOICE)
          return (
            <fieldset className='w-[50%] flex flex-col text-lg px-2 py-2 border-b focus:outline-none focus:border-b-black'>
              {
                options.map((option, i) => {
                  return (
                    <div>
                      <input type='radio' name={`singleChoice-${index}-${isPartner}`} id={`${question}-${i}-${isPartner}`}
                             checked={inputs[index].value === option}
                             onChange={() => setInput(index, option)}/>
                      <label className='p-2' for={`${question}-${i}-${isPartner}`}>{option}</label>
                    </div>
                  )
                })
              }
            </fieldset>
          )

        else if (type == MULTIPLE_CHOICE)
          return (
            <fieldset className='w-[50%] flex flex-col text-lg px-2 py-2 border-b focus:outline-none focus:border-b-black'>
              {
                options.map((option, i) => {
                  return (
                    <div>
                      <input type='checkbox' id={`${question}-${i}-${isPartner}`}
                             checked={inputs[index].value.includes(option)}
                             onChange={() => {setInput(index, option)}}/>
                      <label className='p-2' for={`${question}-${i}-${isPartner}`}>{option}</label>
                    </div>
                  )
                })
              }
            </fieldset>
          )

        else if (type == DROP_DOWN)
          return (
            <select className='w-[50%] flex flex-col text-lg px-2 py-2 border-b focus:outline-none focus:border-b-black'
                    value={inputs[index].value} 
                    onChange={e => setInput(index, e.target.value)}>
              <option disabled selected></option>
              {
                options.map((option, index) => {
                  return (
                    <option>
                      {option}
                    </option>
                  )
                })
              }
            </select>  
          )

        else if (type == DESCRIPTION)
          return (
            <div className='w-[95%] h-fit'>
              <DescriptionEditor value={description} disabled/>
            </div>
          ) 

      })()}

    </div>
  )
}
