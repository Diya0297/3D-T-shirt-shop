import React from 'react'
import state from "../store"
import { useSnapshot } from 'valtio'
import {SketchPicker} from 'react-color'


const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className='absolute left-full ml-3'>
      <SketchPicker 
      color={snap.color}
      disableAlpha
      presetColors={['#ccc', '#F2D1B3', '#F5E1A4', '#000000F', '#C9A9A6']}
      onChange={(color) => state.color = color.hex}
      />
    </div>
  )
}

export default ColorPicker
