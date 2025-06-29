import React from 'react'
import CustomButton from './CustomButton'

const AIPicker = ({prompt, setPrompt, generatingImage, handleSubmit}) => {
 
  return (
    <div className='aipicker-container'>
      <textarea 
      className='aipicker-textarea'
      rows={5}
      placeholder='Ask AI...'
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
      {generatingImage ? (
        <CustomButton 
        type="outline"
        title="Asing AI..."
        customStyles="text-xs"
        />) 

        : (
        <>
        <CustomButton 
        type="outline"
        title="AI Logo"
        customStyles="text-xs"
        handleClick={() => handleSubmit('logo')}
        />

        <CustomButton 
        type="filled"
        title="AI Full"
        customStyles="text-xs"
        handleClick={() => handleSubmit('full')}
        />
        

        </>)}
      </div>
    </div>
  )
}

export default AIPicker
