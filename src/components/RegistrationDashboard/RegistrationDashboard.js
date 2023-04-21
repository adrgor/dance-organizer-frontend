import React from "react";
import TopBar from "../EventsPage/TopBar";
import TicketTypes from "./TicketTypes";
import Products from "./Products";
import RegistrationsPreview from "./RegistrationsPreview";
import RegistrationFormPreview from "./RegistrationFormPreview";

export default function RegistrationDashboard() {
  return (
    <div className="w-screen h-screen">
      <TopBar />

      <div className="w-10/12 m-auto mt-5 p-5 rounded-sm bg-white">
        <p className="text-5xl font-bold m-auto shadow-sm w-fit">
          Placeholder for event name
        </p>
        <RegistrationsPreview />
        <TicketTypes />
        <Products />
        <RegistrationFormPreview />
      </div>
    </div>
  );
}
