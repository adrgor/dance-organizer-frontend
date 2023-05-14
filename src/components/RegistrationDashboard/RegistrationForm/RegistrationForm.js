import React from "react";
import TopBar from "../../EventsPage/TopBar";
import RegistrationInput from "./RegistrationInput";
import { useState, useEffect } from "react";
import ApiUrl from "../../../utils/ApiUrl";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function RegistrationForm() {
  const [searchParams] = useSearchParams()
  const eventId = searchParams.get("eventId")
  const navigate = useNavigate()

  const [registerFormInputs, setRegisterFormInputs] = useState([
    {
      question: "",
      type: "Email",
      options: [""],
      isRequired: true,
      description: "",
    }
  ]);

  const addForm = () => {
    setRegisterFormInputs([
      ...registerFormInputs,
      {
        question: "",
        type: "Email",
        options: [""],
        isRequired: true,
        description: "",
      },
    ]);
  };

  const setInput = (input, index) => {
    const registerFormInputsCopy = [...registerFormInputs];
    registerFormInputsCopy[index] = input;
    setRegisterFormInputs(registerFormInputsCopy);
  };

  const addInputToForm = (input, index) => {
    const registerFormCopy = [...registerFormInputs];
    registerFormCopy[index] = input;
    setRegisterFormInputs(registerFormCopy);
  };

  const remove = (index) => {
    const registerFormInputsCopy = [...registerFormInputs];
    registerFormInputsCopy.splice(index, 1);
    setRegisterFormInputs(registerFormInputsCopy);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(registerFormInputs)
    const requestBody = {
      inputs: registerFormInputs,
      eventId: parseInt(eventId)
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(ApiUrl.FORM, requestOptions);
    navigate(`/registration-dashboard?eventId=${eventId}`)
  };

  useEffect( () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    fetch(`${ApiUrl.FORM}?eventId=${eventId}`, requestOptions)
    .then( (res) => res.json() )
    .then( (data) => {
      setRegisterFormInputs(data.inputs) 
    })
  }, [])

  return (
    <div className="w-full h-full">
      <TopBar />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[800px] bg-white m-auto rounded-sm mt-5 p-5"
      >
        <div className="border">
          <input
            className="text-4xl w-full text-center p-2 mb-5 leading-5 focus:outline-none focus:border-b-black"
            value={"Placeholder for event name"}
          />

          {registerFormInputs && registerFormInputs.length <= 0 && (
            <p className="text-2xl text-center">No inputs defined!</p>
          )}

          {registerFormInputs && registerFormInputs.map((form, index) => {
            return (
              <RegistrationInput
                input={registerFormInputs[index]}
                setInput={(input) => setInput(input, index)}
                addToFormInputs={(input) => addInputToForm(input, index)}
                remove={() => remove(index)}
              />
            );
          })}
          <div
            className='relative text-center text-sm text-gray-300 mt-5 mb-5 hover:cursor-pointer hover:text-black hover:before:bg-black hover:after:bg-black
                                before:relative before:align-middle before:h-[0.5px] before:bg-gray-300 before:content-[""] before:inline-block before:w-2/5 before:right-3 before:ml-[-50%]
                                after:relative after:align-middle after:h-[0.5px] after:bg-gray-300 after:content-[""] after:inline-block after:w-2/5 after:left-3 after:mr-[-50%]'
            onClick={addForm}
          >
            {" "}
            Add +{" "}
          </div>
        </div>

        <div className="w-full flex justify-between">
          <button className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline">
            Discard
          </button>
          <button
            className="m-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
