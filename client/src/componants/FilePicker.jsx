import React from 'react'
import CustomButton from './CustomButton'

const FilePicker = ({file, setFile, readFile}) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col '>
        <input 
        type="file"
        id='file-upload'
        accept='image/*'
        onChange={(e) => setFile(e.target.files[0])}
         />
         <label 
         htmlFor="file-upload" 
         className='filepicker-label'
         >
          File Upload
         </label>
         <p className='mt-2 ml-0.5 text-gray-500 text-xs truncate'> {file == '' ? "No file selected" : file.name} </p>
      </div>
    <div className='mt-4 lex-1 flex flex-wrap gap-3'>
      <CustomButton
      type="outline"
      customStyles="text-sm"
      title="Logo"
      handleClick={() => readFile('logo')}
      />
      <CustomButton
      type="filled"
      customStyles="text-sm"
      title="Full"
      handleClick={() => readFile('full')}
      />
    </div>
     
      
    </div>
  )
}

export default FilePicker
