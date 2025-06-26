import React, { useRef } from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import state from "../store"


const Backdrop = () => {
  const shadows = useRef();
  const snap = useSnapshot(state);
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={4}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      color={snap.color}
    >
      <RandomizedLight 
      color={snap.color}
      amount={4}
      radius={9}
      intensity={1}
      ambient={0.25}
      position={[5, 5, -10]}
      />
      <RandomizedLight 
      color={snap.color}
      amount={4}
      radius={9}
      intensity={1}
      ambient={0.25}
      position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
