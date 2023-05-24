import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function RegistrationFormPreview({ registerFormInputs, eventId }) {
  const [mode, setMode] = useState("FOLDED");

  const handleFolding = () => {
    if (mode == "FOLDED") setMode("UNFOLDED");
    else setMode("FOLDED");
  };

  return (
    <div onClick={handleFolding} className="relative border p-5 mt-5">
      <svg
        className="w-5 absolute right-5 top-5"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        transform={mode == "UNFOLDED" && "rotate(180)"}
      >
        <g strokeWidth="1"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path d="M0.256 8.606c0-0.269 0.106-0.544 0.313-0.75 0.412-0.412 1.087-0.412 1.5 0l14.119 14.119 13.913-13.912c0.413-0.412 1.087-0.412 1.5 0s0.413 1.088 0 1.5l-14.663 14.669c-0.413 0.413-1.088 0.413-1.5 0l-14.869-14.869c-0.213-0.213-0.313-0.481-0.313-0.756z"></path>
        </g>
      </svg>
      <p className="text-4xl font-bold mb-2 w-fit border-b">
        Registration form
      </p>
      {mode == "UNFOLDED" && (
        !registerFormInputs ? (
          <>
            <p className="my-5 text-xl">
              You haven't created a registration form for this event yet
            </p>
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
              href={`/registration-dashboard/registration-form?eventId=${eventId}`}
            >
              Create registration form
            </a>
          </>
        ) : (
          <div className="flex flex-col">
            <div
              className="w-[280px] my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
              onClick={() => {navigator.clipboard.writeText(`localhost:3000/register-for-event?eventId=${eventId}`)}}
            >
              Copy registration link
            </div>

            <a
              className="w-[280px] my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
              href={`/register-for-event?eventId=${eventId}`}
            >
              Preview registration
            </a>

            <a
              className="w-[280px] my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
              href={`/registration-dashboard/registration-form?eventId=${eventId}`}
            >
              Edit registration
            </a>
          </div>
        )
        
      )}
    </div>
  );
}
