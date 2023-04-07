import React from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { useEffect } from 'react';
import ReactQuill from 'react-quill';

export default function DescriptionEditor({value, setValue, disabled}) {

      const handleChange = (content) => {
        if(setValue)
          setValue(content)
      }


    return (
        <div className='border-t mt-5'>
            <div className='mt-5 mb-5 min-h-[500px]'>
                <ReactQuill 
                  placeholder='Event description'
                  value={value}
                  readOnly={disabled}
                  theme={disabled ? "bubble" : "snow"}
                  onChange={handleChange}
                />
            </div>
        </div>
    )
}
