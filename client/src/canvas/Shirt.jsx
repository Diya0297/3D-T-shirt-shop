import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, meshBounds, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';


const Shirt = () => {
  const {nodes, materials} = useGLTF("/shirt_baked.glb");
  const snap = useSnapshot(state);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const stateString = JSON.stringify(snap);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  })

  return (
    <group
    key={stateString}
    >
        <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
        >
        
        {snap.isFullTexture && 
        <Decal 
        position={[0,0,0]}
        rotation={[0,0,0]}
        scale={1}
        map={fullTexture}
        />}
        
        
        {snap.isLogoTexture && 
        <Decal 
            position={[0,0.04,0.1]}
            rotation={[0,0,0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}

        />}

        </mesh>
    </group>
    
  )
}

export default Shirt
