import React, { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../Global/zustand.jsx";
import { useCardsStore } from "../Global/useCards.jsx";
import { gsap } from "gsap";

export function Model(props) {
  const group = useRef();
  const skullRef = useRef();
  const cardref1 = useRef();
  const cardref2 = useRef();
  const cardref3 = useRef();
  const cardref4 = useRef();
  const { nodes, materials, animations } = useGLTF("/FINAL_OMG.glb");
  const { actions, names } = useAnimations(animations, group);
  const [play, setPlay] = useState(false);

  const audio = new Audio('/click-sound.mp3');
  const audioS = new Audio('/success.mp3');
  audioS.volume = 0.7;
  const audioF = new Audio('/fail.mp3');
  audioF.volume = 0.3;

  const emissionMaterialRED = new THREE.MeshStandardMaterial({
    color: 'green', // base color of the material
    emissive: new THREE.Color('red'), // color of the glow
    emissiveIntensity: 1, // intensity of the glow
  });

  const emissionMaterialGREEN = new THREE.MeshStandardMaterial({
    color: 'green', // base color of the material
    emissive: new THREE.Color('green'), // color of the glow
    emissiveIntensity: 1, // intensity of the glow
  });

  const emissionMaterialBLUE = new THREE.MeshStandardMaterial({
    color: 'green', // base color of the material
    emissive: new THREE.Color('blue'), // color of the glow
    emissiveIntensity: 1, // intensity of the glow
  });

  const emissionMaterialPURPLE = new THREE.MeshStandardMaterial({
    color: 'green', // base color of the material
    emissive: new THREE.Color('purple'), // color of the glow
    emissiveIntensity: 1, // intensity of the glow
  });


  const gameStage = useStore((state) => state.gameStage);
  const cardCount = useCardsStore((state) => state.cardCount);
  console.log(cardCount);


  const setGameStage1 = useStore((state) => state.setGameStage1);
  const increaseCardCount = useCardsStore((state) => state.increaseCardCount);

const blueButtonRef = useRef();
const redButtonRef = useRef();
const greenButtonRef = useRef();
const purpleButtonRef = useRef();

  const handleButtonPress = (buttonRef, color) => {
    // Trigger GSAP animation
    gsap.to(buttonRef.current.scale, { x: 0.95, y: 0.95, z: 0.95, duration: 0.1 });
    gsap.to(buttonRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1, delay: 0.1 });

    // Handle button click logic
    handleButtonClick(color);
};



  useEffect(() => {
    if (gameStage === "stage1") {
      names.forEach((name) => {
        const action = actions[name];
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
      });
  
      // Set initial Y position to 0
      gsap.to([skullRef.current.position, cardref1.current.position, cardref2.current.position, cardref3.current.position, cardref4.current.position], {
        y: 0.4,
        duration: 5, // Instantly set the Y position to 0
      });
    }
  }, [gameStage]);
  
  useEffect(() => {
    // Rotations here
    const rotationTween = gsap.to(skullRef.current.rotation, {
      y: "+=6.28319",
      repeat: -1,
      duration: 5,
      ease: "linear",
    });
  
    const rotationTween1 = gsap.to(cardref1.current.rotation, {
      z: "+=2.28319",
      repeat: -1,
      duration: 5,
    });
  
    const rotationTween2 = gsap.to(cardref2.current.rotation, {
      z: "-=2.28319",
      repeat: -1,
      duration: 5,
      ease: "linear",
    });
  
    const rotationTween3 = gsap.to(cardref3.current.rotation, {
      z: "+=2.28319",
      repeat: -1,
      duration: 5,
      ease: "linear",
    });
  
    const rotationTween4 = gsap.to(cardref4.current.rotation, {
      z: "+=1.28319",
      repeat: -1,
      duration: 5,
      ease: "linear",
    });
  
    return () => {
      rotationTween.kill();
      rotationTween1.kill();
      rotationTween2.kill();
      rotationTween3.kill();
      rotationTween4.kill();
    };
  }, []);


  const correctSequence = ["RED", "GREEN", "BLUE", "BLUE", "RED", "BLUE", "GREEN", "RED"];
    // User's click sequence
    const [userSequence, setUserSequence] = useState([]);
    // Refs for the extend meshes to change their materials
    const extendRefs = Array(8).fill().map(() => useRef(null));

    const handleButtonClick = (color) => {
      // Update user's click sequence
      setUserSequence(prev => {
          const updatedSequence = [...prev, color];
          console.log("Current sequence:", updatedSequence);
  
          // Check if updatedSequence has reached the length of correctSequence
          if (updatedSequence.length === correctSequence.length) {
              if (JSON.stringify(updatedSequence) !== JSON.stringify(correctSequence)) {
                  // If sequences don't match, log wrong sequence and reset the user's sequence and the materials of the extend meshes
                  audioF.play();
                  updatedSequence.length = 0; // Reset the sequence
                  extendRefs.forEach(ref => {
                      ref.current.material = new THREE.MeshBasicMaterial({color: 'red'});
                      ref.current.material.needsUpdate = true;
                  });
              } else {
                  // If the sequence is correct, log a success message
                  audioS.play();
              }
          }
  
          return updatedSequence;
      });
  
      // Update material of the next extend mesh
      if (userSequence.length < extendRefs.length) {
          extendRefs[userSequence.length].current.material = new THREE.MeshBasicMaterial({color: 'green'});
          extendRefs[userSequence.length].current.material.needsUpdate = true;
      }
  };
  
  
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="ROAD"
          castShadow
          receiveShadow
          geometry={nodes.ROAD.geometry}
          material={materials.road_material}
          position={[-1.203, 2.237, 5.882]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials["Material.074"]}
          position={[0, -10.654, 0]}
          scale={0.98}
        >
          <mesh
            name="button_game_01"
            castShadow
            receiveShadow
            geometry={nodes.button_game_01.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_02"
            castShadow
            receiveShadow
            geometry={nodes.button_game_02.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_03"
            castShadow
            receiveShadow
            geometry={nodes.button_game_03.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_04"
            castShadow
            receiveShadow
            geometry={nodes.button_game_04.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_05"
            castShadow
            receiveShadow
            geometry={nodes.button_game_05.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_06"
            castShadow
            receiveShadow
            geometry={nodes.button_game_06.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_07"
            castShadow
            receiveShadow
            geometry={nodes.button_game_07.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_08"
            castShadow
            receiveShadow
            geometry={nodes.button_game_08.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_09"
            castShadow
            receiveShadow
            geometry={nodes.button_game_09.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_10"
            castShadow
            receiveShadow
            geometry={nodes.button_game_10.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_11"
            castShadow
            receiveShadow
            geometry={nodes.button_game_11.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_12"
            castShadow
            receiveShadow
            geometry={nodes.button_game_12.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_13"
            castShadow
            receiveShadow
            geometry={nodes.button_game_13.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_14"
            castShadow
            receiveShadow
            geometry={nodes.button_game_14.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_15"
            castShadow
            receiveShadow
            geometry={nodes.button_game_15.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="button_game_16"
            castShadow
            receiveShadow
            geometry={nodes.button_game_16.geometry}
            material={materials["Material.074"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="ELDER_WAND"
            castShadow
            receiveShadow
            geometry={nodes.ELDER_WAND.geometry}
            material={materials.Material}
            position={[-0.03, -0.047, 3.808]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.985}
          />
          <mesh
            name="Icosphere"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere.geometry}
            material={materials.REd}
            position={[-2.373, 5.522, -2.322]}
            scale={0.32}
          />
          <mesh
            name="Icosphere001"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere001.geometry}
            material={materials.BLUE}
            position={[-2.373, 5.522, 2.392]}
            scale={0.32}
          />
          <mesh
            name="Icosphere002"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere002.geometry}
            material={materials["Material.069"]}
            position={[2.269, 5.522, 2.392]}
            scale={0.32}
          />
          <mesh
            name="Icosphere003"
            castShadow
            receiveShadow
            geometry={nodes.Icosphere003.geometry}
            material={materials["Material.017"]}
            position={[2.269, 5.522, -2.249]}
            scale={0.32}
          />
          <mesh
            name="Puzzle_1_Button_BLUE"
            ref={greenButtonRef}
            onClick={() => {handleButtonClick('GREEN')
            audio.play();
            
          }}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Button_BLUE.geometry}
            material={emissionMaterialGREEN}
            position={[0.311, 0, 0]}
          />
          <mesh
            name="Puzzle_1_Button_RED"
            ref={redButtonRef}
            onClick={() =>{ handleButtonClick('RED')
            audio.play();

          }}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Button_RED.geometry}
            material={emissionMaterialRED}
            position={[0.311, 0, 0]}
          />
          <group name="Puzzle_1_Buttons" position={[0.311, 0, 0]} />
          <mesh
          ref={blueButtonRef}
            name="Puzzle_1_Buttons_GREEN"
            onClick={() =>{ handleButtonClick('BLUE')
            audio.play();
          }}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Buttons_GREEN.geometry}
            material={emissionMaterialBLUE}
            position={[0.311, 0, 0]}
          />
          <mesh
            name="Puzzle_1_Buttons_PURPLE"
            ref={purpleButtonRef}
            onClick={() => {handleButtonClick('PURPLE')
            audio.play();
          
          }}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Buttons_PURPLE.geometry}
            material={emissionMaterialPURPLE}
            position={[0.311, 0, 0]}
          />
          <mesh
            name="Puzzle_1_Extend001"
            ref={extendRefs[0]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend001.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend002"
            ref={extendRefs[1]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend002.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend003"
            ref={extendRefs[2]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend003.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend004"
            ref={extendRefs[3]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend004.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend005"
            ref={extendRefs[4]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend005.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend006"
            ref={extendRefs[5]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend006.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend007"
            ref={extendRefs[6]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend007.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Extend008"
            ref={extendRefs[7]}
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Extend008.geometry}
            material={materials["Material.026"]}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Light_1"
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Light_1.geometry}
            material={nodes.Puzzle_1_Light_1.material}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Light_2"
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Light_2.geometry}
            material={nodes.Puzzle_1_Light_2.material}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Light_3"
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Light_3.geometry}
            material={nodes.Puzzle_1_Light_3.material}
            position={[0, -14.838, 0]}
          />
          <mesh
            name="Puzzle_1_Light_4"
            castShadow
            receiveShadow
            geometry={nodes.Puzzle_1_Light_4.geometry}
            material={nodes.Puzzle_1_Light_4.material}
            position={[0, -14.838, 0]}
          />
          <group
            name="Puzzle_1_Pumpkin"
            position={[-3.925, -0.337, -0.376]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={-0.385}
          >
            <mesh
              name="Mesh004"
              castShadow
              receiveShadow
              geometry={nodes.Mesh004.geometry}
              material={materials["Material.070"]}
            />
            <mesh
              name="Mesh004_1"
              castShadow
              receiveShadow
              geometry={nodes.Mesh004_1.geometry}
              material={materials["Material.066"]}
            />
            <mesh
              name="Mesh004_2"
              castShadow
              receiveShadow
              geometry={nodes.Mesh004_2.geometry}
              material={materials["Material.071"]}
            />
            <mesh
              name="Mesh004_3"
              castShadow
              receiveShadow
              geometry={nodes.Mesh004_3.geometry}
              material={materials["Material.072"]}
            />
          </group>
          <mesh
            name="Wizard_Card_display_1"
            castShadow
            receiveShadow
            geometry={nodes.Wizard_Card_display_1.geometry}
            material={materials["Material.073"]}
            position={[-1.92, 1.925, 4.043]}
            rotation={[1.572, 0, 0]}
            scale={[0.127, 0.132, 0.127]}
          />
          <mesh
            name="Wizard_Card_display_2"
            castShadow
            receiveShadow
            geometry={nodes.Wizard_Card_display_2.geometry}
            material={materials["Material.073"]}
            position={[-1.89, -2.171, 4.043]}
            rotation={[1.572, 0, 0]}
            scale={[0.127, 0.132, 0.127]}
          />
          <mesh
            name="Wizard_Card_display_3"
            castShadow
            receiveShadow
            geometry={nodes.Wizard_Card_display_3.geometry}
            material={materials["Material.073"]}
            position={[1.847, -2.231, 4.043]}
            rotation={[1.572, 0, 0]}
            scale={[0.127, 0.132, 0.127]}
          />
          <mesh
            name="Wizard_Card_display_4"
            castShadow
            receiveShadow
            geometry={nodes.Wizard_Card_display_4.geometry}
            material={materials["Material.073"]}
            position={[1.817, 1.925, 4.043]}
            rotation={[1.572, 0, 0]}
            scale={[0.127, 0.132, 0.127]}
          />
        </mesh>
        <group name="MAINBASE" position={[0, -7.238, 0]} scale={7.43}>
          <mesh
            name="Cylinder006"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006.geometry}
            material={materials["Material.059"]}
          />
          <mesh
            name="Cylinder006_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006_1.geometry}
            material={materials.GRASS_COLOR}
          />
        </group>
        <mesh
          name="tree_02"
          castShadow
          receiveShadow
          geometry={nodes.tree_02.geometry}
          material={materials["Material.075"]}
          position={[5.432, 0.394, 0.943]}
          scale={0.14}
        />
        <mesh
          name="tree_02001"
          castShadow
          receiveShadow
          geometry={nodes.tree_02001.geometry}
          material={materials["Material.076"]}
          position={[5.432, 0.394, 0.943]}
          scale={0.14}
        />
        <mesh
          name="tree_02002"
          castShadow
          receiveShadow
          geometry={nodes.tree_02002.geometry}
          material={materials["Material.075"]}
          position={[4.882, 0.394, 0.447]}
          scale={0.182}
        />
        <mesh
          name="tree_02003"
          castShadow
          receiveShadow
          geometry={nodes.tree_02003.geometry}
          material={materials["Material.076"]}
          position={[4.882, 0.394, 0.447]}
          scale={0.182}
        />
        <mesh
          name="tree_02004"
          castShadow
          receiveShadow
          geometry={nodes.tree_02004.geometry}
          material={materials["Material.075"]}
          position={[2.308, 0.487, -4.36]}
          scale={0.23}
        />
        <mesh
          name="tree_02005"
          castShadow
          receiveShadow
          geometry={nodes.tree_02005.geometry}
          material={materials["Material.076"]}
          position={[2.308, 0.487, -4.36]}
          scale={0.23}
        />
        <mesh
          name="tree_02006"
          castShadow
          receiveShadow
          geometry={nodes.tree_02006.geometry}
          material={materials["Material.075"]}
          position={[1.814, 0.599, -4.913]}
          scale={0.285}
        />
        <mesh
          name="tree_02007"
          castShadow
          receiveShadow
          geometry={nodes.tree_02007.geometry}
          material={materials["Material.076"]}
          position={[1.814, 0.599, -4.913]}
          scale={0.285}
        />
        <group name="TRAPDOOR" position={[-0.059, -7.226, 0]} scale={7.43}>
          <mesh
            name="Cylinder011"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials["Material.059"]}
          />
          <mesh
            name="Cylinder011_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_1.geometry}
            material={materials.HANDLES}
          />
          <mesh
            name="Cylinder011_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_2.geometry}
            material={materials["Material.053"]}
          />
          <mesh
            name="Cylinder011_3"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_3.geometry}
            material={materials["Material.055"]}
          />
          <mesh
            name="Cylinder011_4"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_4.geometry}
            material={materials["Material.058"]}
          />
          <mesh
            name="Cylinder011_5"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_5.geometry}
            material={materials["Material.056"]}
          />
          <mesh
            name="Cylinder011_6"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_6.geometry}
            material={materials["Material.057"]}
          />
          <mesh
            name="Cylinder011_7"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_7.geometry}
            material={materials["Material.052"]}
          />
          <mesh
            name="Cylinder011_8"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_8.geometry}
            material={materials["Material.029"]}
          />
          <mesh
            name="Cylinder011_9"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_9.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            name="Cylinder011_10"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_10.geometry}
            material={materials["Material.054"]}
          />
          <mesh
            name="Cylinder011_11"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_11.geometry}
            material={materials["Material.010"]}
          />
          <mesh
            name="Cylinder011_12"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_12.geometry}
            material={materials["Material.011"]}
          />
          <mesh
            name="Cylinder011_13"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_13.geometry}
            material={materials["Material.008"]}
          />
          <mesh
            name="Cylinder011_14"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_14.geometry}
            material={materials["Material.012"]}
          />
          <mesh
            name="Cylinder011_15"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_15.geometry}
            material={materials["Material.025"]}
          />
          <mesh
            name="Cylinder011_16"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_16.geometry}
            material={materials["Material.026"]}
          />
          <mesh
            name="Cylinder011_17"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_17.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            name="Cylinder011_18"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_18.geometry}
            material={materials["Material.034"]}
          />
          <mesh
            name="Cylinder011_19"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_19.geometry}
            material={materials["Material.035"]}
          />
          <mesh
            name="Cylinder011_20"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_20.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            name="Cylinder011_21"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_21.geometry}
            material={materials["Material.019"]}
          />
          <mesh
            name="Cylinder011_22"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_22.geometry}
            material={materials["Material.016"]}
          />
          <mesh
            name="Cylinder011_23"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_23.geometry}
            material={materials["Material.027"]}
          />
          <mesh
            name="Cylinder011_24"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_24.geometry}
            material={materials["Material.028"]}
          />
          <mesh
            name="Cylinder011_25"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_25.geometry}
            material={materials["Material.023"]}
          />
          <mesh
            name="Cylinder011_26"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_26.geometry}
            material={materials["Material.040"]}
          />
          <mesh
            name="Cylinder011_27"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_27.geometry}
            material={materials["Material.041"]}
          />
          <mesh
            name="Cylinder011_28"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_28.geometry}
            material={materials["Material.020"]}
          />
          <mesh
            name="Cylinder011_29"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_29.geometry}
            material={materials["Material.042"]}
          />
          <mesh
            name="Cylinder011_30"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_30.geometry}
            material={materials["Material.036"]}
          />
          <mesh
            name="Cylinder011_31"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_31.geometry}
            material={materials["Material.037"]}
          />
          <mesh
            name="Cylinder011_32"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_32.geometry}
            material={materials["Material.043"]}
          />
          <mesh
            name="Cylinder011_33"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_33.geometry}
            material={materials["Material.044"]}
          />
          <mesh
            name="Cylinder011_34"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_34.geometry}
            material={materials["Material.049"]}
          />
          <mesh
            name="Cylinder011_35"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_35.geometry}
            material={materials["Material.050"]}
          />
          <mesh
            name="Cylinder011_36"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_36.geometry}
            material={materials["Material.038"]}
          />
          <mesh
            name="Cylinder011_37"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_37.geometry}
            material={materials["Material.047"]}
          />
          <mesh
            name="Cylinder011_38"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_38.geometry}
            material={materials["Material.048"]}
          />
          <mesh
            name="Cylinder011_39"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_39.geometry}
            material={materials["Material.045"]}
          />
          <mesh
            name="Cylinder011_40"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_40.geometry}
            material={materials["Material.046"]}
          />
          <mesh
            name="Cylinder011_41"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_41.geometry}
            material={materials["Material.024"]}
          />
          <mesh
            name="Cylinder011_42"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_42.geometry}
            material={materials["Material.014"]}
          />
          <mesh
            name="Cylinder011_43"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_43.geometry}
            material={materials["Material.015"]}
          />
          <mesh
            name="Cylinder011_44"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_44.geometry}
            material={materials["Material.007"]}
          />
          <mesh
            name="Cylinder011_45"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_45.geometry}
            material={materials["Material.006"]}
          />
          <mesh
            name="Cylinder011_46"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_46.geometry}
            material={materials["Material.018"]}
          />
          <mesh
            name="Cylinder011_47"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_47.geometry}
            material={materials.REd}
          />
          <mesh
            name="Cylinder011_48"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_48.geometry}
            material={materials["Material.003"]}
          />
          <mesh
            name="Cylinder011_49"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_49.geometry}
            material={materials["Material.002"]}
          />
          <mesh
            name="Cylinder011_50"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011_50.geometry}
            material={materials["Material.051"]}
          />
          <group
            ref={skullRef}
            onClick={(e) => {
              e.stopPropagation();
              setGameStage1();
            }}
            onPointerOver={(e) => {
              console.log("hovered");
            }}
            name="SKULL"
            position={[0.048, 1.249, 0.289]}
            scale={0.007}
          >
            <mesh
              name="Icosphere005"
              castShadow
              receiveShadow
              geometry={nodes.Icosphere005.geometry}
              material={materials["Material.077"]}
            />
            <mesh
              name="Icosphere005_1"
              castShadow
              receiveShadow
              geometry={nodes.Icosphere005_1.geometry}
              material={materials["Material.078"]}
            />
            <mesh
              name="Icosphere005_2"
              castShadow
              receiveShadow
              geometry={nodes.Icosphere005_2.geometry}
              material={materials["Material.079"]}
            />
          </group>
        </group>
        <group
          name="cauldron002"
          position={[-4.873, 0.374, 1.335]}
          scale={0.093}
        >
          <mesh
            name="Cylinder009"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009.geometry}
            material={materials["Material.067"]}
          />
          <mesh
            name="Cylinder009_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009_1.geometry}
            material={materials["Material.069"]}
          />
        </group>
        <group
          name="logs002"
          position={[-4.873, 0.243, 1.34]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.021, 0.115, 0.021]}
        >
          <mesh
            name="Cylinder010"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010.geometry}
            material={materials["Material.065"]}
          />
          <mesh
            name="Cylinder010_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010_1.geometry}
            material={materials["Material.064"]}
          />
        </group>
        <group
          name="object_002"
          position={[-4.578, 0.436, 2.283]}
          scale={0.158}
        >
          <mesh
            name="Cylinder008"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder008.geometry}
            material={materials["Material.067"]}
          />
          <mesh
            name="Cylinder008_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder008_1.geometry}
            material={materials.GREEN}
          />
        </group>
        <group
          name="object_003"
          position={[-4.577, 0.214, 2.291]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.035, 0.195, 0.035]}
        >
          <mesh
            name="Cylinder007"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007.geometry}
            material={materials["Material.065"]}
          />
          <mesh
            name="Cylinder007_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder007_1.geometry}
            material={materials["Material.064"]}
          />
        </group>
        <group
          name="object_004"
          position={[-4.489, 0.455, 2.489]}
          rotation={[-0.068, -1.076, 2.829]}
          scale={0.174}
        >
          <mesh
            name="Plane157"
            castShadow
            receiveShadow
            geometry={nodes.Plane157.geometry}
            material={materials["Material.060"]}
          />
          <mesh
            name="Plane157_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane157_1.geometry}
            material={materials["Material.068"]}
          />
          <mesh
            name="Plane157_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane157_2.geometry}
            material={materials["Material.063"]}
          />
          <mesh
            name="Plane157_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane157_3.geometry}
            material={materials["Material.062"]}
          />
          <mesh
            name="Plane157_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane157_4.geometry}
            material={materials["Material.061"]}
          />
        </group>
        <mesh
          name="object_005"
          castShadow
          receiveShadow
          geometry={nodes.object_005.geometry}
          material={materials.GREEN}
          position={[-4.515, 0.537, 2.421]}
          scale={0.009}
        />
        <group
          name="FloorTiles"
          position={[-5.61, 0.198, 1.431]}
          rotation={[-Math.PI, 0.002, -Math.PI]}
          scale={[0.091, 0.064, 0.085]}
        >
          <mesh
            name="Plane075"
            castShadow
            receiveShadow
            geometry={nodes.Plane075.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            name="Plane075_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_1.geometry}
            material={materials["Material.029"]}
          />
          <mesh
            name="Plane075_2"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_2.geometry}
            material={materials["Material.052"]}
          />
          <mesh
            name="Plane075_3"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_3.geometry}
            material={materials.RED}
          />
          <mesh
            name="Plane075_4"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_4.geometry}
            material={materials.GREEN}
          />
          <mesh
            name="Plane075_5"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_5.geometry}
            material={materials.BLUE}
          />
          <mesh
            name="Plane075_6"
            castShadow
            receiveShadow
            geometry={nodes.Plane075_6.geometry}
            material={materials.REd}
          />
        </group>
        <group
          name="pupmpkin_top_01001"
          position={[-5.581, 0.47, 0.755]}
          scale={0.121}
        >
          <mesh
            name="Sphere005"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005.geometry}
            material={materials["Material.053"]}
          />
          <mesh
            name="Sphere005_1"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_1.geometry}
            material={materials["Material.055"]}
          />
          <mesh
            name="Sphere005_2"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_2.geometry}
            material={materials["Material.056"]}
          />
          <mesh
            name="Sphere005_3"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_3.geometry}
            material={materials["Material.054"]}
          />
          <mesh
            name="Sphere005_4"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_4.geometry}
            material={materials["Material.058"]}
          />
          <mesh
            name="Sphere005_5"
            castShadow
            receiveShadow
            geometry={nodes.Sphere005_5.geometry}
            material={materials["Material.057"]}
          />
        </group>
        <mesh
        ref={cardref1}
          
          name="Wizard_Card_1"
          onClick={(e) => {
            e.stopPropagation();
            increaseCardCount();
            audio.play();
            cardref1.current && cardref1.current.parent.remove(cardref1.current);
          }}
          castShadow
          receiveShadow
          geometry={nodes.Wizard_Card_1.geometry}
          material={materials["Material.073"]}
          position={[-4.623, -10, 0.381]}
          rotation={[1.572, 0, 0]}
          scale={[0.04, 0.042, 0.04]}
        />
        <mesh
        ref={cardref2}
          name="Wizard_Card_2"
          onClick={(e) => {
            e.stopPropagation();
            increaseCardCount();
            audio.play();
            cardref2.current && cardref2.current.parent.remove(cardref2.current);
          }}
          castShadow
          receiveShadow
          geometry={nodes.Wizard_Card_2.geometry}
          material={materials["Material.073"]}
          position={[5.555, -10, 3.546]}
          rotation={[1.572, 0, 0]}
          scale={[0.04, 0.042, 0.04]}
        />
        <mesh
        ref={cardref3}
          name="Wizard_Card_3"
          onClick={(e) => {
            e.stopPropagation();
            increaseCardCount();
            audio.play();
            cardref3.current && cardref3.current.parent.remove(cardref3.current);
          }}
          castShadow
          receiveShadow
          geometry={nodes.Wizard_Card_3.geometry}
          material={materials["Material.073"]}
          position={[1.789, -10, -4.188]}
          rotation={[1.572, 0, 0]}
          scale={[0.04, 0.042, 0.04]}
        />
        <mesh
        ref={cardref4}
          name="Wizard_Card_4"
          onClick={(e) => {
            e.stopPropagation();
            increaseCardCount();
            audio.play();
            cardref4.current && cardref4.current.parent.remove(cardref4.current);
          }}
          castShadow
          receiveShadow
          geometry={nodes.Wizard_Card_4.geometry}
          material={materials["Material.073"]}
          position={[-0.779, -10, -5.547]}
          rotation={[1.572, 0, 0]}
          scale={[0.04, 0.042, 0.04]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/FINAL_OMG.glb");

export default Model;
