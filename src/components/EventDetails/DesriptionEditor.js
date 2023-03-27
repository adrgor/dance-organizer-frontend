import React from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useEffect } from 'react';

export default function DescriptionEditor({value, setValue}) {

    const { quill, quillRef } = useQuill({"placeholder": "Event description"});

    useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            setValue(quillRef.current.firstChild.innerHTML)
          });
        }
      }, [quill])

    return (
        <div>
            <div className='mt-10 mb-5 min-h-[500px]'>
                <div ref={quillRef} />
            </div>
        </div>
    )
}
