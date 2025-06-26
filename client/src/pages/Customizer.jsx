import React , {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSnapshot } from 'valtio'
import config  from "../config/config"
import state from "../store"
import { download, logoShirt } from "../assets"
import {downloadCanvasToImage, reader} from "../config/helpers"
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants"
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../componants';



const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImage, setGeneratingImage] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState(""); // state to find out which editor tab is clicked
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt:true, stylishShirt:false});

 
  const generateTabContent = () => {
      
      switch(activeEditorTab){
        case "colorpicker":
          return <ColorPicker/>

        case "filepicker":
          return <FilePicker
                  file={file}
                  setFile = {setFile}
                  readFile = {readFile}
          />

        case "aipicker":
          return <AIPicker
                  prompt={prompt}
                  setPrompt={setPrompt}
                  generatingImg={generatingImage}
                  handleSubmit={handleSubmit}
          />

        default:
          return null;
      }
  }

  const handleSubmit = async (type) =>{
    
    if(!prompt){alert("Enter a prompt!")};

    try{

      setGeneratingImage(true);
      
      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ prompt }) 
      })

      const data = await response.json();
      handleDecals(type, data.photo)
      
    
    }catch(error){
      console.error(error)
      alert(error)
    }
    finally{
      setGeneratingImage(false);
      setActiveEditorTab("");
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
          setActiveFilterTab(prev => {return {...prev, logoShirt:!prev.logoShirt}})
          break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
          setActiveFilterTab(prev => {return {...prev, stylishShirt:!prev.stylishShirt}})
          break;
      default:
          state.isLogoTexture = true;
          state.isFullTexture = false;
          break;
    }
  }

  const handleDecals = (type, result) =>{

    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result; 

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }

  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
  

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        <motion.div
          {...slideAnimation('left')}
          className='absolute top-0 left-0 z-10'>

          <div className='flex items-center  min-h-screen'>

            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab) => (
                <Tab 
                  key={tab.name}
                  handleClick={() => setActiveEditorTab(tab.name)}
                  tab={tab}
                />
              ))}
              {generateTabContent()}
            </div>
            
            

          </div>
          
        </motion.div>

        <motion.div
        className='absolute top-5 right-5 z-10'
        {...fadeAnimation}>
          <CustomButton 
          type="filled"
          title="Go Back"
          handleClick = {() => state.intro = true}
          customStyles="w-fit px-4 py-2 font-bold text-sm"
          />


        </motion.div>
        <motion.div 
        className="filtertabs-container"
        {...slideAnimation('up')}>
          {FilterTabs.map((tab,index) => (
                <Tab 
                  key={tab.name}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                  isFilterTab
                  isActiveTab={activeFilterTab[tab.name]}
                  tab={tab}
                />
              ))}

        </motion.div>
        </>
      )}
    </AnimatePresence>
    
  )
}

export default Customizer
