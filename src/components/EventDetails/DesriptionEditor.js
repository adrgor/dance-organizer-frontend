import React from "react";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";

export default function DescriptionEditor({ value, setValue, disabled }) {
  const handleChange = (content) => {
    if (setValue) setValue(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  }

  const formats = [
    'header', 'size', 'font', 'align',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'script',
    'color', 'background'
  ]


  return (
    <div className="mt-5">
      <div className="mt-5 mb-5">
        <ReactQuill
          placeholder=""
          value={value}
          readOnly={disabled}
          theme={disabled ? "bubble" : "snow"}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
