import React from 'react'
import {useThree} from "@react-three/fiber";
import { useEffect } from 'react';

export function CameraSetup(props) {
    

    const { camera } = useThree();  // Extract camera from the three-fiber context

  useEffect(() => {
    // Set the camera's position
    camera.position.set(0, 13, 13);
    camera.lookAt(0, 0, 0);
  }, [camera]);  // Dependency on camera to ensure this runs when camera is available

  return null;  // This component doesn't render anything visible
}

export default CameraSetup;