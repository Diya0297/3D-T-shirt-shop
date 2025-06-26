import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {snapshot, useSnapshot} from 'valtio'
import state from "../store"
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation

} from "../config/motion"
import { CustomButton } from '../componants'

const Home = () => {
  const snap = useSnapshot(state);
  return (
   <AnimatePresence>
    {snap.intro && <motion.section className='home' {...slideAnimation("left")}>
      <motion.header className="div" {...slideAnimation("down")}>
        <img src="./threejs.png" alt="" className='w-8 h-8 object-contain'/>
      </motion.header>

    <motion.div className='home-content' {...headContainerAnimation}>
      <motion.div {...headTextAnimation}>
        <h1 className='head-text'>
          LET'S DO <br className='xl:block hidden'/> IT.
        </h1>
      </motion.div>
      <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
        <p className='max-w-md font-normal text-gray-600 text-base'>
          Create your unique and exclusive shirt with our brand new 3D
          customization tool. <strong>Unleash your imagination</strong> {" "}and 
          define your own style. 
        </p>

        <CustomButton
          title="Customize It"
          type="filled"
          customStyles="w-fit font-bold px-4 py-2.5 text-sm"
          handleClick={() => state.intro = false}
        />

      </motion.div>  

    </motion.div>

    </motion.section>}

   </AnimatePresence>
  )
}

export default Home
