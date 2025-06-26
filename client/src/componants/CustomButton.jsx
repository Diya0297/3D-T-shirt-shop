import React from 'react'
import { useSnapshot } from 'valtio'
import state from "../store"
import { color } from 'framer-motion';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({type, customStyles, title, handleClick}) => {
    const snap = useSnapshot(state);
    const generateStyles = (type) =>{
        if(type === "filled"){
            return{
                color:"#FFFFFF",
                backgroundColor:snap.color
            }
        } else if(type == "outline"){
            return{
                borderWidth:'1px',
                borderColor:snap.color,
                color:snap.color

            }
        }
    }
    return (
    <button 
    
    className={`px-2 py-1 flex-1 rounded-md ${customStyles}`}
    style={generateStyles(type)}
    onClick = {handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton
