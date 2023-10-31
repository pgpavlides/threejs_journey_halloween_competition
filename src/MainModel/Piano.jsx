import React, { useRef, useCallback, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { gsap } from 'gsap';
import { useStore } from "../Global/zustand.jsx";


export function Piano(props) {
  const { nodes, materials } = useGLTF("/Piano_3D.glb");
  const [rotatedKey, setRotatedKey] = useState(null);
  const pianomodel = useRef();
  const gameStage = useStore((state) => state.gameStage);


  


  const meshRefNTO = useRef();
  const meshRefMI = useRef();
  const meshRefRE = useRef();
  const meshRefFA = useRef();
  const meshRefSOL = useRef();
  const meshRefLA = useRef();
  const meshRefSI = useRef();
  const meshRefNTO1 = useRef();
  const meshRefRE1 = useRef();
  const meshRefMI1 = useRef();
  const meshRefSOLDIES = useRef();
  const meshRefNTODIES = useRef();
  const meshRefREDIES = useRef();
  const meshRefFADIES = useRef();
  const meshRefLADIES = useRef();
  const meshRefNTO1DIES = useRef();
  const meshRefRE1DIES = useRef();


  const rotateMeshOnX = (meshRef) => {
    if (meshRef && meshRef.current) {
      // Kill any existing animations on the mesh to make the new animation interruptible
      gsap.killTweensOf(meshRef.current.rotation);
  
      // Calculate the pressed and released positions
      const pressedPosition = meshRef.current.rotation.x + Math.PI / 50;
      const releasedPosition = meshRef.current.rotation.x;
  
      // Animate the mesh pressing down and then releasing
      gsap.to(meshRef.current.rotation, {
        x: pressedPosition,
        duration: 0.1, // Fast press down
        yoyo: true, // Play the animation in reverse after it's done
        repeat: 1, // Repeat the animation once (for the reverse play)
        ease: "power2.inOut" // Ease both in and out
      });
    }
  };

  useEffect(() => {
    if (gameStage === "stage1") {
      gsap.to(pianomodel.current.position, {
        duration: 5, // Animation duration in seconds
        x: 0,       // Target X position
        y: 8,       // Target Y position
        z: 0,       // Target Z position
        ease: 'power2.inOut', // Easing function (optional)
      });
    }
  }, [gameStage]);

  const handleMeshClick = useCallback((soundName) => {
    const audio = new Audio(`/pianosounds/${soundName}.mp3`);
    audio.play();
    setRotatedKey(soundName); // Set the rotated key when clicked
  }, []);

  return (
    <group ref={pianomodel} scale={2} position={[0, -10, 0]} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BASE.geometry}
        material={materials["Material.002"]}
        position={[-0.024, 0.011, 0]}
      />
      <mesh
        ref={meshRefNTO}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("NTO");
          rotateMeshOnX(meshRefNTO);
        }}
        castShadow
        receiveShadow
        geometry={nodes.NTO001.geometry}
        material={nodes.NTO001.material}
        position={[-0.908, 0.218, -0.616]}
      />
      <mesh
        ref={meshRefMI}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("MI");
            rotateMeshOnX(meshRefMI);
        }}
        castShadow
        receiveShadow
        geometry={nodes.MI.geometry}
        material={nodes.MI.material}
        position={[-0.45, 0.218, -0.616]}
      />
      <mesh
        ref={meshRefRE}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("RE");
            rotateMeshOnX(meshRefRE);
        }}
        castShadow
        receiveShadow
        geometry={nodes.RE.geometry}
        material={nodes.RE.material}
        position={[-0.676, 0.218, -0.618]}
      />
      <mesh
        ref={meshRefFA}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("FA");
            rotateMeshOnX(meshRefFA);

        }}
        castShadow
        receiveShadow
        geometry={nodes.FA.geometry}
        material={nodes.FA.material}
        position={[-0.338, 0.218, -0.615]}
      />
      <mesh
        ref={meshRefSOL}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("SOL");
            rotateMeshOnX(meshRefSOL);
        }}
        castShadow
        receiveShadow
        geometry={nodes.SOL.geometry}
        material={nodes.SOL.material}
        position={[-0.118, 0.218, -0.618]}
      />
      <mesh
        ref={meshRefLA}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("LA");
            rotateMeshOnX(meshRefLA);
        }}
        castShadow
        receiveShadow
        geometry={nodes.LA.geometry}
        material={nodes.LA.material}
        position={[0.091, 0.218, -0.63]}
      />
      <mesh
        ref={meshRefSI}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("SI");
            rotateMeshOnX(meshRefSI);
        }}
        castShadow
        receiveShadow
        geometry={nodes.SI.geometry}
        material={nodes.SI.material}
        position={[0.309, 0.218, -0.63]}
      />
      <mesh
        ref={meshRefNTO1}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("NTO1");
            rotateMeshOnX(meshRefNTO1);
        }}
        castShadow
        receiveShadow
        geometry={nodes.NTO1.geometry}
        material={nodes.NTO1.material}
        position={[0.422, 0.218, -0.616]}
      />
      <mesh
        ref={meshRefRE1}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("RE1");
            rotateMeshOnX(meshRefRE1);
        }}
        castShadow
        receiveShadow
        geometry={nodes.RE2.geometry}
        material={nodes.RE2.material}
        position={[0.65, 0.218, -0.617]}
      />
      <mesh
        ref={meshRefMI1}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("MI1");
          rotateMeshOnX(meshRefMI1);
        }}
        castShadow
        receiveShadow
        geometry={nodes.MI2.geometry}
        material={nodes.MI2.material}
        position={[0.878, 0.218, -0.614]}
      />
      <mesh
      ref={meshRefSOLDIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("SOLDIES");
          rotateMeshOnX(meshRefSOLDIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.SOLDIES.geometry}
        material={materials["Material.001"]}
        position={[-0.008, 0.237, -0.617]}
      />
      <mesh
        ref={meshRefNTODIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("NTODIES");
            rotateMeshOnX(meshRefNTODIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.NTODIES.geometry}
        material={materials["Material.001"]}
        position={[-0.794, 0.237, -0.616]}
      />
      <mesh
        ref={meshRefREDIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("REDIES");
            rotateMeshOnX(meshRefREDIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.REDIES.geometry}
        material={materials["Material.001"]}
        position={[-0.567, 0.237, -0.616]}
      />
      <mesh
        ref={meshRefFADIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("FADIES");
            rotateMeshOnX(meshRefFADIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.FADIES.geometry}
        material={materials["Material.001"]}
        position={[-0.228, 0.237, -0.622]}
      />
      <mesh
        ref={meshRefLADIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("LADIES");
            rotateMeshOnX(meshRefLADIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.LADIES.geometry}
        material={materials["Material.001"]}
        position={[0.198, 0.237, -0.622]}
      />
      <mesh
        ref={meshRefNTO1DIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("NTO1DIES");
            rotateMeshOnX(meshRefNTO1DIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.NTO1DIES.geometry}
        material={materials["Material.001"]}
        position={[0.536, 0.237, -0.622]}
      />
      <mesh
        ref={meshRefRE1DIES}
        onClick={(e) => {
          e.stopPropagation();
          handleMeshClick("RE1DIES");
            rotateMeshOnX(meshRefRE1DIES);
        }}
        castShadow
        receiveShadow
        geometry={nodes.RE2DIES.geometry}
        material={materials["Material.001"]}
        position={[0.763, 0.237, -0.622]}
      />
      <group position={[-0.001, 0.203, 0.772]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh004.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh004_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh004_2.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh004_3.geometry}
          material={materials.Material}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Piano_3D.glb");

export default Piano;
