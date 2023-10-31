import React, { useState, Suspense, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import './App.css'
import { useStore } from "./Global/zustand.jsx";

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TransformControls, OrbitControls, CameraControls } from "@react-three/drei";

import CustomLights from './Lights/Lights.jsx'
import CustomAmbientLight from "./Lights/AmbientLight";

import { useCardsStore } from "./Global/useCards.jsx";


import CameraSetup from './Camera/Camera.jsx'
import Piano from "./MainModel/Piano.jsx";
import Model from "./MainModel/Model.jsx";
import Haze from "./Lights/Haze";


const audio = new Audio('/magic.mp3');
audio.volume = 0.3;





function App() {

const cardCount = useCardsStore((state) => state.cardCount);


useEffect(() => {
  if (cardCount === 4) {
    audio.play();
  }
},[cardCount])


  return (
    <>
      <Canvas shadows>
        <Haze />
      <fog attach="fog" args={['#030917', 1, 25]} />
        {/* <TransformControls> */}
        <CustomLights />
        {/* <CustomAmbientLight /> */}
        {/* </TransformControls> */}
        <OrbitControls 
        makeDefault
        minDistance={5}    // Minimum zoom distance
        maxDistance={20}   // Maximum zoom distance
        maxPolarAngle={Math.PI / 2} // Limit angle to prevent looking below the object
      />
        <CameraSetup />
        <Piano />
          <Model  />
        
      </Canvas>
    </>
  )
}



export default App
