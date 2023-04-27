import React from "react";
import DescriptionEditor from "../../EventDetails/DesriptionEditor";

export default function RegistrationInput({
  addToFormInputs,
  remove,
  input,
  setInput,
}) {
  const addOption = (e) => {
    const optionsCopy = [...input.options, ""];
    const newInput = { ...input, options: optionsCopy };
    setInput(newInput);
    addToFormInputs(newInput);
  };

  const removeOption = (index) => {
    const optionsCopy = [...input.options];
    if (input.options.length > 1) optionsCopy.splice(index, 1);
    else {
      const option = optionsCopy[index];
      option = "";
    }

    const newInput = { ...input, options: optionsCopy };
    setInput(newInput);
    addToFormInputs(newInput);
  };

  const handleOptionInputChange = (e, index) => {
    const optionsCopy = [...input.options];
    optionsCopy[index] = e.target.value;

    const newInput = { ...input, options: optionsCopy };
    setInput(newInput);
    addToFormInputs(newInput);
  };

  const handleIsRequiredChange = (e) => {
    const newInput = { ...input, isRequired: !input.isRequired };
    setInput(newInput);
    addToFormInputs(newInput);
  };

  return (
    <div className="relative border-b shadow-sm text-right">
      <div className="w-full m-auto mt-5 pt-5 px-10 flex justify-between">
        <input
          className="w-[50%] text-lg px-2 py-2 bg-gray-100 border-b focus:outline-none focus:border-b-black"
          placeholder="Question"
          value={input.question}
          onChange={(e) => setInput({ ...input, question: e.target.value })}
        ></input>
        <select
          className="w-[40%] text-lg px-2 py-2 border focus:outline-none focus:border-black"
          value={input.type}
          onChange={(e) => setInput({ ...input, type: e.target.value })}
        >
          <option>Email</option>
          <option>Ticket type</option>
          <option>Product</option>
          <option>Input field</option>
          <option>Single choice</option>
          <option>Multiple choice</option>
          <option>Drop-down list</option>
          <option>Description</option>
        </select>
      </div>

      <div className="w-full m-auto p-5 px-10">
        {input.type != "Input field" &&
          input.type != "Ticket type" &&
          input.type != "Email" &&
          input.type != "Description" &&
          input.options.map((option, index) => {
            return (
              <>
                <input
                  className="w-3/4 px-2 py-5 border-b focus:outline-none focus:border-b-black focus:text-black"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionInputChange(e, index)}
                />
                <svg
                  className="w-7 inline-block ml-5 mt-9"
                  onClick={addOption}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                      stroke="rgb(59 130 246)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
                <svg
                  className="w-7 inline-block ml-3 mt-9"
                  onClick={() => removeOption(index)}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      id="Vector"
                      d="M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20"
                      stroke="rgb(59 130 246)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </>
            );
          })}

        {input.type == "Description" ? (
          <DescriptionEditor
            value={input.description}
            setValue={(newDescription) =>
              setInput({ ...input, description: newDescription })
            }
          />
        ) : (
          <label className="relative inline-flex items-center mb-5 mt-5 mr-10 cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={input.isRequired}
              onChange={handleIsRequiredChange}
            />
            <div
              className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 
                         peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all'
            ></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              Required
            </span>
          </label>
        )}
      </div>

      <div className="absolute top-[-1rem] right-0 p-1" onClick={remove}>
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
