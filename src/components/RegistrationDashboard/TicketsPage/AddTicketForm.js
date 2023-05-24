import React from "react";
import { COUPLE, SOLO } from "../../../utils/TicketTypeInputs";

export default function AddTicketForm({ ticket, setTicket, removeTicket }) {
  return (
    <div className={`relative w-full [&>*]:mr-5 p-5 shadow-sm`}>
      <div className="w-full m-auto mt-5 pt-5 px-10 flex justify-between">
        <input
          className="w-[50%] text-lg px-2 py-2 bg-gray-100 border-b focus:outline-none focus:border-b-black"
          placeholder="Ticket name"
          value={ticket.name}
          onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
        />

        <select
          className="w-[40%] text-lg px-2 py-2 border focus:outline-none focus:border-black"
          value={ticket.type}
          onChange={(e) => setTicket({ ...ticket, type: e.target.value })}
        >
          <option selected disabled></option>
          <option>{SOLO}</option>
          <option>{COUPLE}</option>
        </select>
      </div>

      <div className="w-full text-center m-auto mt-5">
        <input
          className="w-3/4 px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black"
          placeholder="Price"
          type="number"
          step={0.01}
          min={0}
          value={ticket.price}
          onChange={(e) => setTicket({ ...ticket, price: e.target.value })}
        />

        <input
          className="w-3/4 px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black"
          placeholder="Currency"
          value={ticket.currency}
          onChange={(e) => setTicket({ ...ticket, currency: e.target.value })}
        />

        <input
          className="w-3/4 px-2 py-4 border-b focus:outline-none focus:border-b-black focus:text-black"
          type="number"
          min={0}
          placeholder="Number of tickets"
          value={ticket.numberOfTickets}
          onChange={(e) =>
            setTicket({ ...ticket, numberOfTickets: e.target.value })
          }
        />
      </div>

      <div className="absolute top-5 right-0" onClick={removeTicket}>
        <svg
          className="w-7 hover:cursor-pointer"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8L8 16M8.00001 8L16 16"
            stroke="rgb(107 114 128)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
