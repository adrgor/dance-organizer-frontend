import React from 'react'
import ClientInput from './ParticipantInput'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ApiUrl from '../../utils/ApiUrl'

export default function ParticipantRegistrationForm() {
  const [registrationForm, setRegistrationForm] = useState({
    inputs: [],
    tickets: [],
    products: []
  })
  const [isPartnerRegistration, setPartnerRegistration] = useState(false)

  const eventId = useSearchParams()[0].get("eventId")

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
  
      fetch(`${ApiUrl.PRODUCT}?eventId=${eventId}`, requestOptions)
      .then( (res) => res.json() )
    ])
    .then( ([formData, ticketData, productData]) => {
      setRegistrationForm(prevState => ({
        ...prevState,
        inputs: formData.inputs,
        tickets: ticketData.tickets,
        products: productData.products
      }))
    })
  }, [])

  
  return (
    <div className='h-screen w-[800px] bg-white'>
      <form className='w-full bg-white'>
        <div className='text-center text-4xl font-bold m-5'>Placeholder for event name</div>

        <div className='border pb-5'>
          {registrationForm.inputs.map((input, index) => {
            return (
                <ClientInput key={index} type={input.type}
                            question={input.question} options={input.options}
                            isRequired={input.isRequired} description={input.description}
                            tickets={registrationForm.tickets} products={registrationForm.products}/>
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
                  <ClientInput key={index} type={input.type}
                               question={input.question} options={input.options}
                               isRequired={input.isRequired} description={input.description}
                               tickets={registrationForm.tickets} products={registrationForm.products}
                               isPartner/>
              )
            })}
          </>
        }
        
        <div className='text-right border-t mt-5'>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold m-5 py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline justify-self-end"
            onClick={() => {}}>
            Submit registration
          </button>
        </div>
      </form>
    </div>
  )
}
