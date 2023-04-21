import React from "react";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

export default function DescriptionEditor({ value, setValue, disabled }) {
  const handleChange = (content) => {
    if (setValue) setValue(content);
  };

  return (
    <div className="border-t mt-5">
      <div className="mt-5 mb-5">
        <ReactQuill
          placeholder="Description"
          value={value}
          readOnly={disabled}
          theme={disabled ? "bubble" : "snow"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
