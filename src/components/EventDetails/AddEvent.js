import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import TopBar from "../GeneralUseComponents/TopBar";
import countries from "../../countries.json";
import Datepicker from "react-tailwindcss-datepicker";
import DescriptionEditor from "./DesriptionEditor";
import danceStyles from "../../utils/DanceStyles";
import ItemsSelect from "../FormComponents/ItemsSelect";
import eventTypes from "../../utils/EventTypes";
import { useNavigate } from "react-router-dom";
import validateEventDetails from "../../utils/ValidateEventDetails";
import ErrorPopUp from "../GeneralUseComponents/ErrorPopUp";
import ApiUrl from "../../utils/ApiUrl";

export default function AddEvent() {
  const navigate = useNavigate()
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState({
    startDate: {},
    endDate: {},
  });
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Select event type");
  const [selectedDanceStyles, setSelectedDanceStyles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleOnSelect = (country) => {
    setCountry(country);
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const formatResult = (item) => {
    return (
      <span
        style={{ display: "block", textAlign: "left" }}
      >{`${item.name}`}</span>
    );
  };

  const handlePublish = (e) => {
    e.preventDefault();

    const requestBody = {
      eventName,
      startDate: date.startDate,
      endDate: date.endDate,
      country: country.name,
      city,
      description,
      eventType,
      danceStyles: selectedDanceStyles,
    };

    const message = validateEventDetails(requestBody)
    if(message) {
      setErrorMessage(message)
      return
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(requestBody),
    };

    fetch(ApiUrl.EVENT_RESOURCE, requestOptions);
    navigate("/my-events")
  };

  return (
    <div className="w-screen h-full overflow-auto">
      <TopBar />

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-auto mt-5 w-10/12">
        <div className="ml-5">
          {errorMessage && <ErrorPopUp errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
        </div>
        <form className="min-h-[80%] bg-white p-5 flex flex-col">
          <div className="flex items-center justify-between">
            <input
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="text-4xl w-1/2 pl-5 mb-5 leading-5 border-b focus:outline-none"
              placeholder="Event name"
            />

            <div className="w-1/3">
              <Datepicker
                value={date}
                onChange={handleDateChange}
                useRange={false}
                inputClassName="outline-none border-none focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center border-b border-t w-1/2">
            <div className="w-1/2 ">
              <ReactSearchAutocomplete
                items={countries}
                placeholder="Country"
                autoFocus
                maxResults={5}
                formatResult={formatResult}
                onSelect={handleOnSelect}
                styling={{
                  zIndex: 1,
                  border: "none",
                  boxShadow: "none",
                  borderRadius: "5px",
                  fontSize: "1.25rem",
                  fontFamily: "inherit",
                  color: "inherit",
                  placeholderColor: "default",
                }}
              />
            </div>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="text-xl border-l pl-5 w-1/2 focus:outline-none"
            />
          </div>

          <DescriptionEditor
            value={description}
            setValue={handleDescriptionChange}
          />

          <label>Select event type</label>
          <ItemsSelect
            items={eventTypes}
            label={eventType}
            setValue={setEventType}
          />

          <label>Select dance style</label>
          <ItemsSelect
            items={danceStyles}
            isCheckboxSelected={true}
            isSearchEnabled={true}
            label="Select dance style"
            setValue={setSelectedDanceStyles}
            selectedItems={selectedDanceStyles}
          />

          <div className="flex justify-between">
            <a
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
              href={"/events"}
            >
              Back
            </a>
            <div>
              <button
                className="mr-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
                onClick={handlePublish}
              >
                Publish
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-2xl rounded focus:outline-none focus:shadow-outline"
                onClick={handlePublish}
              >
                Save as draft
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
