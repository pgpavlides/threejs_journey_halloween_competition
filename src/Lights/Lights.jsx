import React from "react";
import { PointLight, DirectionalLight, PointLightHelper } from "three";
import { useHelper } from "@react-three/drei";

const CustomLights = () => {
  const pointLightRef = React.useRef();
  const pointLightRef2 = React.useRef();
  const pointLightRef3 = React.useRef();
  const pointLightRef4 = React.useRef();

  // Use the useHelper hook to add a helper to the light
  useHelper(pointLightRef, PointLightHelper);
  useHelper(pointLightRef2, PointLightHelper);
  useHelper(pointLightRef3, PointLightHelper);
  useHelper(pointLightRef4, PointLightHelper);

  return (
    <>
      <pointLight
        // ref={pointLightRef}
        position={[7, 5, 0]}
        color="#b16af7"
        intensity={20}
        distance={30}
        decay={2}
      />
      <pointLight
        // ref={pointLightRef2}
        position={[-7, 5, 0]}
        color="#b86b00"
        intensity={50}
        distance={30}
        decay={2}
      />
      <pointLight
        // ref={pointLightRef3}
        position={[0, 5, 7]}
        color="#b86b00"
        intensity={10}
        distance={30}
        decay={2}
      />
      <pointLight
        // ref={pointLightRef4}
        position={[0, 5, -5]}
        color="#ababab"
        intensity={5}
        distance={30}
        decay={2}
      />

      <pointLight
        // ref={pointLightRef4}
        position={[0, 10, 0]}
        color="#ababab"
        intensity={10}
        distance={30}
        decay={2}
      />

<pointLight
        // ref={pointLightRef4}
        position={[20, 2, 0]}
        color="#ababab"
        intensity={10}
        distance={30}
        decay={2}
      />
    </>
  );
};

export default CustomLights;
