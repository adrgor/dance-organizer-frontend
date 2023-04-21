import React from "react";
import { useState } from "react";

export default function RegistrationsPreview() {
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
      <p className="text-4xl font-bold mb-2 w-fit border-b">Registrations</p>
      {mode == "UNFOLDED" && (
        <p className="my-5 text-xl">No registrations yet</p>
      )}
    </div>
  );
}
